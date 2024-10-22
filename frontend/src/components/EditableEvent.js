import React, { useState } from 'react';

function EditableEvent() {
  const [event, setEvent] = useState("Productivity & Profit in Taskify");
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="event-section">
      <h4>Live Webinar</h4>
      {isEditing ? (
        <input
          type="text"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
        />
      ) : (
        <p>{event}</p>
      )}
      <button onClick={handleEdit}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </div>
  );
}

export default EditableEvent;
