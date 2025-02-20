import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes"; // Routing Component
import Sidenav from "./components/Sidenav"; // Sidebar Navigation

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidenav /> {/* Sidebar Navigation */}
        <div className="flex-1 p-6 overflow-auto">
          <AppRoutes /> {/* Main Content (Routing) */}
        </div>
      </div>
    </Router>
  );
};

export default App;
