const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    task: String,
    list: String,
    due: Date,
  },
  {
    timestamps: true,
  }
  
);

module.exports = mongoose.model("Task", taskSchema);