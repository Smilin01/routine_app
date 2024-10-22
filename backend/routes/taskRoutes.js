const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Add a new task
router.post('/tasks', async (req, res) => {
  const { title, description, time, date } = req.body;
  const newTask = new Task({ title, description, time, date });
  await newTask.save();
  res.json(newTask);
});

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

module.exports = router;
