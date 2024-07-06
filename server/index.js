const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const insight = require("./models/insight");
const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL;
const PORT = process.env.PORT;

const app = express();

app.use(express.json());

mongoose
  .connect(DB_CONNECTION_URL)
  .then(() => console.log("Database Connected"))
  .catch((error) => {
    console.log("MongoDB Connection Error\n", error);
  });

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist/")));
  app.use(
    cors({
      origin: SERVER_HOST_ADDRESS,
      credentials: true,
    })
  );
} else {
  app.use(
    cors({
      origin: ["http://localhost:3000", "http://localhost:5000"],
      credentials: true,
    })
  );
}

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

app.get("/", async (req, res) => {
  const data = await insight.aggregate([
    {
      $group: {
        _id: "$sector",
        intensity: { $sum: 1 },
      },
    },
  ]);
  res.json(data);
});

app.all("*", (req, res, next) => {
  next(new customError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  console.log(`ERROR:\nat:${err.at}\n`, err);
  if (!err.statusCode) err.statusCode = 500;
  if (!err.message) err.message = "Something went wrong";
  res.status(err.statusCode).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
