import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Progress from './components/Progress';
import EditableEvent from './components/EditableEvent';
import './App.css';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Set current date and time for updating every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Navigate between days
  const handlePrevDay = () => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    setCurrentDate(prevDate);
  };

  const handleNextDay = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setCurrentDate(nextDate);
  };

  // Format date and time
  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="App">
      <div className="sidebar">
        <h2>Taskify - John Smilin</h2>
        <div className="date-time">
          <h3>{formatDate(new Date())}</h3>
          <p className="live-time">{formatTime(currentDate)}</p>
        </div>
        <TaskForm />
      </div>
      <div className="main-content">
        <div className="task-scheduler">
          <div className="calendar-header">
            <button className="nav-btn" onClick={handlePrevDay}>←</button>
            <h3>{formatDate(currentDate)}</h3>
            <button className="nav-btn" onClick={handleNextDay}>→</button>
          </div>
          <TaskList currentDate={currentDate} />
        </div>
      </div>
      <div className="right-widgets">
        <div className="user-profile">
          <h4>John Smilin</h4>
          <p>My Settings</p>
        </div>
        <div className="goal-progress">
          <Progress currentDate={currentDate} />
        </div>
        <div className="webinar-info">
          <EditableEvent />
        </div>
      </div>
    </div>
  );
}

export default App;
