import React from 'react';

const TaskForm = ({ task, onNoteChange, onDateChange, onStatusChange }) => (
  <div>
    <input
      type="date"
      value={task.date}
      onChange={e => onDateChange(e.target.value)}
      style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
    />
    <input
      type="text"
      value={task.note}
      onChange={e => onNoteChange(e.target.value)}
      placeholder="Add note"
      style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
    />
    <select
      value={task.status}
      onChange={e => onStatusChange(e.target.value)}
      style={{ padding: '5px', width: '100%' }}
    >
      <option value="Pending">Pending</option>
      <option value="In Progress">In Progress</option>
      <option value="Completed">Completed</option>
    </select>
  </div>
);

export default TaskForm;