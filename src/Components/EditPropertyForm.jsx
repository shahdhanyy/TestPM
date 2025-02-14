// src/components/EditPropertyForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditPropertyForm = ({ propertyToEdit, updateProperty }) => {
  const navigate = useNavigate();
  // Start local state from the property object passed in
  const [property, setProperty] = useState({ ...propertyToEdit });

  const handleChange = (e) => {
    setProperty({
      ...property,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the update function passed from parent
    updateProperty(property);
    // Navigate back to the listing or wherever you want
    navigate("/");
  };

  return (
    <form className="bg-white shadow-md rounded p-6" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">Property Name</label>
        <input
          type="text"
          name="name"
          value={property.name}
          onChange={handleChange}
          className="border rounded w-full p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Location</label>
        <input
          type="text"
          name="location"
          value={property.location}
          onChange={handleChange}
          className="border rounded w-full p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Value</label>
        <input
          type="text"
          name="value"
          value={property.value}
          onChange={handleChange}
          className="border rounded w-full p-2"
          required
        />
      </div>

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Update Property
      </button>
    </form>
  );
};

export default EditPropertyForm;
