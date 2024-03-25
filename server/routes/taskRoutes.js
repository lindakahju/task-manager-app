const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');



router.post("/complete", taskController.completeTask);
router.get("/completedTasks", taskController.getCompletedTasks);
router.get("/tasks", taskController.getAllTasks);
router.get("/list/:list", taskController.getTasksByList);
router.post("/create", taskController.createTask);
router.put("/update/:id", taskController.updateTask);
router.delete("/delete/:id", taskController.deleteTask);

module.exports = router;
