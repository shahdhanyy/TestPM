import React from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-5">
      <h2 className="text-xl font-bold mb-6">Property Manager</h2>
      <ul>
        <li className="mb-4">
          <Link to="/" className="block p-2 hover:bg-gray-700 rounded">🏠 Property Listing</Link>
        </li>
        <li className="mb-4">
          <Link to="/add-property" className="block p-2 hover:bg-gray-700 rounded">➕ Add Property</Link>
        </li>
        <li>
          <Link to="/view-requests" className="block p-2 hover:bg-gray-700 rounded">📜 View Requests</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidenav;
