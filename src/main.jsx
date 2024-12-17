import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./main.css";
import App from "./App.jsx";
import "react-day-picker/dist/style.css";
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
