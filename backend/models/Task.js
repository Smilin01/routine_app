const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  time: { type: String, required: true },
  date: { type: String, required: true }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
