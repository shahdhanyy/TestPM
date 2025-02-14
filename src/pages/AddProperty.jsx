// src/pages/AddProperty.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const [property, setProperty] = useState({ name: "", location: "", value: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Property Added:", property);
    navigate("/"); // Redirect to property listing
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add Property</h2>
      <form className="bg-white shadow-md rounded p-6" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Property Name</label>
          <input type="text" name="name" value={property.name} onChange={handleChange} className="border rounded w-full p-2" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input type="text" name="location" value={property.location} onChange={handleChange} className="border rounded w-full p-2" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Value</label>
          <input type="text" name="value" value={property.value} onChange={handleChange} className="border rounded w-full p-2" required />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add Property</button>
      </form>
    </div>
  );
};

export default AddProperty;
