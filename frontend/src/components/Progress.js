import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Progress({ currentDate }) {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(0);

  useEffect(() => {
    fetchTasks();
  }, [currentDate]);

  const fetchTasks = async () => {
    const res = await axios.get('https://daily-routine-ftg2.onrender.com/api/tasks');
    const todayTasks = res.data.filter((task) => task.date === currentDate.toISOString().split('T')[0]);
    setTasks(todayTasks);
    const completed = todayTasks.filter((task) => task.completed).length;
    setCompletedTasks(completed);
  };

  const calculateProgress = () => {
    if (tasks.length === 0) return 0;
    return Math.round((completedTasks / tasks.length) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className="progress-section">
      <p>Goal</p>
      <div className={`progress-circle ${progress === 100 ? 'progress-complete' : ''}`}>
        <span>{progress}%</span>
      </div>
      <p>Till {currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.</p>
      {progress === 100 && (
        <div className="greeting">
          <p>🎉 Congratulations! You've finished today's tasks! 🎉</p>
          <div className="pop-up-animation">🎂🎁🍾</div>
        </div>
      )}
    </div>
  );
}

export default Progress;
