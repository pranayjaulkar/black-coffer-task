import { useMemo, useEffect, useState } from "react";
import * as d3 from "d3";

export const Barplot = ({ width, height, data }) => {
  const BAR_PADDING = 0.3;
  const MARGIN = { top: 0, right: 30, bottom: 0, left: 160 };
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const [grid, setGrid] = useState(null);
  const [allShapes, setAllShapes] = useState(null);

  const yScale = useMemo(() => {
    if (data) {
      const sectors = data.sort((a, b) => a.intensity - b.intensity).map((d) => (d._id ? d._id : "Others"));
      return d3.scaleBand().domain(sectors).range([0, boundsHeight]).padding(BAR_PADDING);
    } else return null;
  }, [data, height]);

  const xScale = useMemo(() => {
    if (data?.length) {
      const max = d3.extent(data.map((d) => d.intensity))[1];
      return d3
        .scaleLinear()
        .domain([0, max || 10])
        .range([0, boundsWidth]);
    } else return null;
  }, [data, width]);

  useEffect(() => {
    if (data?.length) {
      const shapes = data.map((d, i) => {
        const y = yScale(d._id ? d._id : "Others");
        if (y === undefined) {
          return null;
        }
        if (!d._id) console.log("Others", d);
        return (
          <g key={i}>
            <rect
              x={xScale(0)}
              y={yScale(d._id || "Others")}
              width={xScale(d.intensity)}
              height={yScale.bandwidth()}
              fill="#af6cff"
              rx={2}
            />
            <text
              x={xScale(d.intensity) + 25}
              y={y + yScale.bandwidth() / 2}
              textAnchor="end"
              alignmentBaseline="central"
              fontSize={12}
              fontWeight={500}
              opacity={0.7}
            >
              {d.intensity}
            </text>
            <text
              x={-15}
              y={y + yScale.bandwidth() / 2}
              textAnchor="end"
              alignmentBaseline="central"
              fontSize={12}
              fontWeight={500}
              opacity={0.7}
            >
              {d._id || "Others"}
            </text>
          </g>
        );
      });

      const grd = xScale
        .ticks(5)
        .slice(1)
        .map((value, i) => (
          <g key={i}>
            <line x1={xScale(value)} x2={xScale(value)} y1={0} y2={boundsHeight} stroke="#808080" opacity={0.2} />
            <text
              x={xScale(value)}
              y={boundsHeight + 10}
              textAnchor="middle"
              alignmentBaseline="central"
              fontSize={9}
              fontWeight={700}
              opacity={0.7}
            >
              {value}
            </text>
          </g>
        ));

      setAllShapes(shapes);
      setGrid(grd);
    }
  }, [data]);

  return (
    <div className={`p-4 border rounded-md`}>
      <svg width={width} height={height}>
        <g width={boundsWidth} height={boundsHeight} transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}>
          {grid}
          {allShapes}
        </g>
      </svg>
    </div>
  );
};

export default Barplot;
