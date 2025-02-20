// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import PropertyList from "../pages/PropertyList";
import AddProperty from "../pages/AddProperty";
import EditProperty from "../pages/EditProperty";
import PropertyDetails from "../pages/PropertyDetails";
import SellingRequests from "../pages/SellingRequests";
import SellingRequestDetails from "../pages/SellingRequestDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PropertyList />} />
      <Route path="/add-property" element={<AddProperty />} />
      <Route path="/edit-property/:id" element={<EditProperty />} />
      <Route path="/property-details/:id" element={<PropertyDetails />} />
      <Route path="/selling-requests" element={<SellingRequests />} />
      <Route path="/request-details/:offerID" element={<SellingRequestDetails />} />

    </Routes>
  );
};

export default AppRoutes;
