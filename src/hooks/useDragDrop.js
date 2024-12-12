import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

export const useDragDrop = (sections, setSections) => {
  const onDragEnd = (result) => {
    const { source, destination } = result;
    
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const section = sections.find((sec) => sec.id === source.droppableId);
      const [movedTask] = section.tasks.splice(source.index, 1);
      section.tasks.splice(destination.index, 0, movedTask);
      setSections([...sections]);
    } else {
      const sourceSection = sections.find(
        (sec) => sec.id === source.droppableId
      );
      const destSection = sections.find(
        (sec) => sec.id === destination.droppableId
      );
      const [movedTask] = sourceSection.tasks.splice(source.index, 1);
      destSection.tasks.splice(destination.index, 0, movedTask);
      setSections([...sections]);
    }
  };

  return { onDragEnd };
};