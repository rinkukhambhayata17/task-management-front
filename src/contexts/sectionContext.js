import React, { createContext, useContext, useState } from 'react';

const SectionContext = createContext();

export const useSections = () => useContext(SectionContext);

export const SectionProvider = ({ children }) => {
  const [sections, setSections] = useState([]);

  return (
    <SectionContext.Provider value={{ sections, setSections }}>
      {children}
    </SectionContext.Provider>
  );
};