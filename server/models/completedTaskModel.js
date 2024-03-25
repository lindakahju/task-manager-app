// completedTaskModel.js
const mongoose = require("mongoose");

const completedTaskSchema = mongoose.Schema(
  {
    task: String,
    list: String,
    due: Date,
  },
  {
    timestamps: true,
  }
);

const CompletedTask = mongoose.model("CompletedTask", completedTaskSchema);

module.exports = CompletedTask;

