import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SectionProvider } from "./contexts/sectionContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SectionProvider>
    <App />
  </SectionProvider>,
  document.getElementById("root")
);
