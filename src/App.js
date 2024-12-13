import React, { useState } from "react";
import Section from "./components/Section";
import AddSectionButton from "./components/AddsectionButton";
import { DragDropContext } from "react-beautiful-dnd";
import { useSections } from "./contexts/sectionContext";
import { useDragDrop } from "./hooks/useDragDrop";
import './styles/global.css';
import axios from 'axios';

const App = () => {
  const { sections, setSections } = useSections();
  const { onDragEnd } = useDragDrop(sections, setSections);

  // Function to handle note change in tasks
  const handleNoteChange = (sectionId, taskId, value) => {
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        section.tasks = section.tasks.map((task) =>
          task.id === taskId ? { ...task, note: value } : task
        );
      }
      return section;
    });
    setSections(updatedSections);
  };

  const addTask = (sectionId, taskIndex) => {
    const newTask = {
      id: `task-${Date.now()}`,
      name: "Untitled Task",
      date: "",
      status: "Pending",
      note: "",
    };

    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        const tasks = [...section.tasks];
        if(taskIndex == 0){
          tasks.splice(taskIndex + 1, 0, newTask);
          return { ...section, tasks };
        }else{
          let insertIndex = tasks.length - 1;
          tasks.splice(insertIndex, 0, newTask);
          return { ...section, tasks };
        }
      }
      return section;
    });
    setSections(updatedSections);
  };

  const addSection = async () => {
    const sectionTitle = prompt("Enter section title:");
    if (!sectionTitle) return;
  
    try {
      // Call the API with POST method
      const response = await axios.post('http://localhost:5000/sections', { name: sectionTitle });
  
      // Use the response to set the section
      const newSection = {
        id: response.data.id || `section-${Date.now()}`, // Use the API's ID or fallback to a generated ID
        name: sectionTitle,
        tasks: [
          { id: "task-1", name: "Add Task...", date: "", status: "", note: "" },
          { id: "task-2", name: "Add Task...", date: "", status: "", note: "" }
        ],
      };
  
      setSections([
        ...sections,
        newSection,
      ]);
  
      console.log("Section added successfully:", newSection);
    } catch (error) {
      console.error("Error adding section:", error);
      alert("Failed to add section. Please try again.");
    }
  };
  

  const onTitleChange = (sectionId, newTitle) => {
    const updatedSections = sections.map((section) =>
      section.id === sectionId ? { ...section, title: newTitle } : section
    );
    setSections(updatedSections);
  };

  const handleTitleChange = (sectionId, newTitle) => {
    const updatedSections = sections.map((section) =>
      section.id === sectionId ? { ...section, title: newTitle } : section
    );
    setSections(updatedSections);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <AddSectionButton onAddSection={addSection} />
        {sections.map((section) => (
          <Section
            key={section.id}
            section={section}
            onTitleChange={onTitleChange}
            addTask={addTask}
            handleNoteChange={handleNoteChange}
            handleTitleChange={handleTitleChange}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default App;
