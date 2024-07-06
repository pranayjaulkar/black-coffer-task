// import { useState } from "react";
import Chart from "./components/chart";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    fetch("http://localhost:5000")
      .then((response) => response.json())
      .then((insights) => {
        console.log('insights: ', insights);
        setData(insights);
      });
  }, []);
  return (
    <div className="flex justify-center open-sans">
      <Chart width={500} height={500} data={data} />
    </div>
  );
}

export default App;
