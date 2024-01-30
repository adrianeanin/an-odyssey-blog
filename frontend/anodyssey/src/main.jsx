import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router.jsx";
import { BlogProvider } from "./context/BlogContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import "./assets/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <BlogProvider>
        <Router />
      </BlogProvider>
    </ThemeProvider>
  </React.StrictMode>
);
