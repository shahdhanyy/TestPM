// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Sidenav from "./components/Sidenav";
import "./index.css";

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidenav />
        <div className="flex-1 p-6">
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
