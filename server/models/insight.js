const mongoose = require("mongoose");

const insightSchema = new mongoose.Schema({
  end_year: { type: String, default: "" },
  intensity: { type: Number, default: 0 },
  sector: { type: String, default: "" },
  topic: { type: String, default: "" },
  insight: { type: String, required: true },
  url: { type: String, required: true },
  region: { type: String, default: "" },
  start_year: { type: String, default: "" },
  impact: { type: String, default: "" },
  added: { type: Date, required: true },
  published: { type: Date, default: "" },
  country: { type: String, default: "" },
  relevance: { type: Number, default: 0 },
  pestle: { type: String, default: "" },
  source: { type: String, default: "" },
  title: { type: String, required: true },
  likelihood: { type: Number, default: 0 },
});

const Insight = mongoose.model("Insight", insightSchema);

module.exports = Insight;
