// src/components/PropertyCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-md transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fadeIn cursor-pointer"
      onClick={() => navigate(`/property-details/${property.id}`)}
    >
      {/* Property Image with Overlay */}
      <div className="relative group">
        <img
          src={property.imageUrl}
          alt={property.propertyName}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-300"></div>
        <div className="absolute bottom-2 left-2 text-white text-sm font-semibold px-3 py-1 bg-black bg-opacity-50 rounded-lg">
          {property.rentingStatus}
        </div>
      </div>

      {/* Property Details */}
      <div className="p-5">
        {/* Location and Features */}
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <FaBed className="mr-1 text-gray-500" /> {property.numOfRooms} Bed
          <FaBath className="mr-1 ml-3 text-gray-500" /> {property.numOfBathrooms} Bath
          <MdLocationOn className="ml-3 mr-1 text-gray-500" /> {property.PropertyAddress}
        </div>

        {/* Property Name */}
        <h3 className="text-lg font-bold text-gray-900">{property.propertyName}</h3>

        {/* Price and Funding Percentage */}
        <div className="flex justify-between items-center mt-2">
          <p className="text-green-600 text-xl font-bold">AED {property.propertyPrice}</p>
          <p className="text-gray-500 text-sm font-semibold">{property.fundingPercentage}% Funded</p>
        </div>

        {/* Funding Progress Bar */}
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2 relative">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${property.fundingPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Financial Section */}
        <div className="mt-3 bg-gray-100 p-4 rounded-lg text-sm text-gray-700 shadow-sm">
          <p className="flex justify-between mt-1">
            <span> Yearly Investment Return:</span>
            <span className="font-semibold">{property.totalInvestmentReturn}</span>
          </p>
          <p className="flex justify-between mt-2">
            <span> Growth Value:</span>
            <span className="font-semibold">AED {property.propertyValueGrowth}</span>
          </p>
          <p className="flex justify-between mt-2">
            <span> Gross Yield:</span>
            <span className="font-semibold">{property.annualGrossYield}%</span>
          </p>
        </div>

        {/* Edit Button (Stops Event Propagation) */}
        <div className="flex mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevents clicking the card from triggering navigation
              navigate(`/edit-property/${property.id}`);
            }}
            className="flex-1 bg-blue-900 text-white py-2 rounded-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
