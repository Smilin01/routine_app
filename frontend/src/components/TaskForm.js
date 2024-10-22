import React, { useState } from 'react';
import axios from 'axios';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Personal');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description, time, date, category };
    await axios.post('https://daily-routine-ftg2.onrender.com/api/tasks', newTask);
    setTitle('');
    setDescription('');
    setTime('');
    setDate('');
    setCategory('Personal');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Personal">Personal</option>
        <option value="Official">Official</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
