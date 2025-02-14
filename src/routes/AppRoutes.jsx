// src/routes/AppRoutes.jsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import PropertyList from "../pages/PropertyList";
import AddProperty from "../pages/AddProperty";
import EditProperty from "../pages/EditProperty";
import ViewRequests from "../pages/ViewRequests";
import PropertyDetails from "../pages/PropertyDetails";

const AppRoutes = () => {
  const [properties, setProperties] = useState([
    { id: 1, name: "Luxury Apartment", location: "Dubai, UAE", value: "$500,000" },
    { id: 2, name: "Beach Villa", location: "Abu Dhabi, UAE", value: "$750,000" },
    { id: 3, name: "Skyline Penthouse", location: "New York, USA", value: "$2,000,000" },
  ]);

  const updateProperty = (updatedProperty) => {
    setProperties(properties.map((prop) => (prop.id === updatedProperty.id ? updatedProperty : prop)));
  };

  return (
    <Routes>
      <Route path="/" element={<PropertyList properties={properties} />} />
      <Route path="/add-property" element={<AddProperty />} />
      <Route path="/edit-property/:id" element={<EditProperty properties={properties} updateProperty={updateProperty} />} />
      <Route path="/view-requests" element={<ViewRequests />} />
      <Route path="/property-details/:id" element={<PropertyDetails />} />
    </Routes>
  );
};

export default AppRoutes;
