// src/pages/PropertyList.jsx
import React from "react";
import PropertyCard from "../components/PropertyCard";

/**
 * Receives 'properties' as a prop from the parent (AppRoutes),
 * rather than using a hardcoded array.
 */
const PropertyList = ({ properties }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Property Listing</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
