import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

const Section = ({ section, addTask, handleNoteChange, handleTitleChange }) => (
  <div style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
    <input
      type="text"
      value={section.name}
      onChange={(e) => handleTitleChange(section.id, e.target.value)}
      style={{
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "10px",
        border: "none",
        borderBottom: "1px solid #ddd",
        width: "100%",
        padding: "5px",
      }}
    />
    <Droppable droppableId={section.id}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} style={{ marginTop: "10px" }}>
          {(section.tasks || []).map((task, index) => (
            <Task
              key={task.id}
              task={task}
              index={index}
              sectionId={section.id} // Pass sectionId to Task
              addTask={addTask}
              handleNoteChange={handleNoteChange} // Pass handleNoteChange to Task
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

export default Section;
