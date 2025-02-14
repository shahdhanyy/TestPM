// src/components/PropertyCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      <h3 className="text-lg font-semibold">{property.name}</h3>
      <p className="text-gray-600">{property.location}</p>
      <p className="text-gray-800 font-bold">{property.value}</p>
      <button
        onClick={() => navigate(`/edit-property/${property.id}`)}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Edit
      </button>
    </div>
  );
};

export default PropertyCard;
