import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index, sectionId, addTask, handleNoteChange }) => {
  // Check if the task is "Add Task..."
  if (task.name === "Add Task...") {
    return (
      <div
        onClick={() => addTask(sectionId, index)} // Call addTask on click
        style={{
          display: "flex",
          alignItems: "center",
          margin: "5px 0",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9",
          cursor: "pointer",
        }}
      >
        {task.name}
      </div>
    );
  }

  // Standard draggable task
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            display: "flex",
            alignItems: "center",
            margin: "5px 0",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            backgroundColor: "#fff",
          }}
        >
          <span style={{ flex: 1 }}>{task.name}</span>
          <input
            type="date"
            value={task.date}
            onChange={(e) =>
              handleNoteChange(sectionId, task.id, e.target.value) // Pass sectionId
            }
            style={{ marginRight: "10px" }}
          />
          <span style={{ marginRight: "10px" }}>{task.status}</span>
          <input
            type="text"
            value={task.note}
            placeholder="Add note"
            onChange={(e) =>
              handleNoteChange(sectionId, task.id, e.target.value) // Pass sectionId
            }
          />
        </div>
      )}
    </Draggable>
  );
};

export default Task;