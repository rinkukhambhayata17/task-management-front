import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const SectionContext = createContext();

export const useSections = () => useContext(SectionContext);

export const SectionProvider = ({ children }) => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get('http://localhost:5000/sections');
        console.log('response ??', response.data.data);

        let sectionsData = response.data.data;

        if (sectionsData.length > 0) {
          sectionsData = await Promise.all(
            sectionsData.map(async (singleSection) => {
              const taskResponse = await axios.get(`http://localhost:5000/tasks/section/${singleSection.id}`);
              let taskData = taskResponse.data.data;

              taskData = [
                { id: "task-1", name: "Add Task...", date: "", status: "", note: "" },
                ...taskData,
                { id: "task-2", name: "Add Task...", date: "", status: "", note: "" }
              ];

              return {
                ...singleSection,
                tasks: taskData,
              };
            })
          );
        }

        console.log('sectionsData ?? ', sectionsData);
        setSections(sectionsData);


      } catch (error) { 
        console.error('Error fetching sections:', error);
      }
    };

    fetchSections();
  }, []);


  return (
    <SectionContext.Provider value={{ sections, setSections }}>
      {children}
    </SectionContext.Provider>
  );
};