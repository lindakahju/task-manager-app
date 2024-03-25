const Task = require('../models/taskModel');
const CompletedTask = require('../models/completedTaskModel');
const moment = require('moment-timezone');

moment.tz.setDefault("Europe/Stockholm");

module.exports = {
  completeTask: async (req, res) => {
    const { task, list, due } = req.body;
    if (!task || !list || !due) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }
    try {
      const data = new CompletedTask(req.body);
      await data.save();
      await Task.findOneAndDelete({ task, list, due });
      res.status(201).json({
        success: true,
        message: "Task completed",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to complete task",
        error: error.message,
      });
    }
  },

  getCompletedTasks: async (req, res) => {
    try {
      const data = await CompletedTask.find({});
      const formattedData = data.map((task) => ({
        ...task.toObject(),
        due: moment(task.due).format("D/M HH:mm"),
      }));
      res.json({ success: true, data: formattedData });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch completed tasks",
        error: error.message,
      });
    }
  },

  getAllTasks: async (req, res) => {
    try {
      const data = await Task.find({});
      const formattedData = data.map((task) => ({
        ...task.toObject(),
        due: moment(task.due).format("D/M HH:mm"),
      }));
      res.json({ success: true, data: formattedData });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch tasks",
        error: error.message,
      });
    }
  },

  getTasksByList: async (req, res) => {
    const list = req.params.list;
    try {
      const data = await Task.find({ list: list });
      res.json({ success: true, data: data });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch tasks by list",
        error: error.message,
      });
    }
  },

  createTask: async (req, res) => {
    const { task, list, due } = req.body;
    if (!task || !list || !due) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }
    try {
      const data = new Task(req.body);
      await data.save();
      res.status(201).json({ success: true, message: "Task saved successfully", data: data });
    } catch (error) {
      console.error("Failed to save task:", error);
      res.status(500).json({ success: false, message: "Failed to save task", error: error.message });
    }
  },

  updateTask: async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    try {
      const data = await Task.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      res.json({
        success: true,
        message: "Task updated successfully",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update task",
        error: error.message,
      });
    }
  },

  deleteTask: async (req, res) => {
    const id = req.params.id;

    try {
      const data = await Task.findByIdAndDelete(id);
      res.json({
        success: true,
        message: "Task deleted successfully",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete task",
        error: error.message,
      });
    }
  }
};
