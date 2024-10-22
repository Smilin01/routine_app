import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskList({ currentDate }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, [currentDate]);

  const fetchTasks = async () => {
    const res = await axios.get('https://daily-routine-ftg2.onrender.com/api/tasks');
    const todayTasks = res.data.filter((task) => task.date === currentDate.toISOString().split('T')[0]);
    setTasks(todayTasks);
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://daily-routine-ftg2.onrender.com/api/tasks/${id}`);
    fetchTasks();
  };

  const handleToggleComplete = async (id, completed) => {
    await axios.put(`https://daily-routine-ftg2.onrender.com/api/tasks/${id}`, { completed: !completed });
    fetchTasks();
  };

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
          <div className="task-details">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id, task.completed)}
              className="task-checkbox"
            />
            <span className="task-time">{task.time}</span>
            <div className="task-text">
              <strong>{task.title}</strong> - {task.description}
              <span className={`task-type ${task.category === 'Personal' ? 'personal' : 'office'}`}>
                {task.category}
              </span>
            </div>
          </div>
          <button className="delete-btn" onClick={() => handleDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
