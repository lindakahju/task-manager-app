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

//////////////// BRETT /////////////////////////////

// const mongoose = require('mongoose');
// const {Schema} = require('mongoose');

// const taskSchema = new Schema (  {
//   task: String,
//   category: String,
//   due: Date,
// },
// {
//   timestamps: true,
// })

// const TaskModel = mongoose.model('Task', taskSchema);

// module.exports = TaskModel;

