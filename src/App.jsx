// src/App.jsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes"; // Routing Component
import Sidenav from "./Components/CustomNavbar"; // Sidebar Navigation

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidenav /> {/* Sidebar Navigation */}
        <div className="flex-1 p-6">
          <AppRoutes /> {/* Main Content (Routing) */}
        </div>
      </div>
    </Router>
  );
};

export default App;
