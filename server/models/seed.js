const mongoose = require("mongoose");
const insight = require("./insight");
const sampleData = require("./sampleData");
const DB_CONNECTION_URL =
  "mongodb+srv://pranaypj13:N5VRRYMUeqIK0ekc@cluster0.2lhxmmq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(DB_CONNECTION_URL)
  .then(() => console.log("Database Connected"))
  .catch((error) => {
    console.log("MongoDB Connection Error\n", error);
  });

(async function () {
  try {
    const res = await insight.insertMany(sampleData);
    console.log('res: ', res);
    console.log("Sample data inserted successfully");
  } catch (error) {
    console.log("error: ", error);
  }
})();
