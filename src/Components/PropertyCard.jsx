import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBed, FaBath } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import {
  TrendingUp,
  Users,
  DollarSign,
  BarChart3,
  Home,
  Banknote,
  Percent,
  Calendar,
} from "lucide-react";
const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-md transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer border border-gray-200"
      onClick={() => {
        console.log("Navigating to property details with ID:", property.id);
        if (property.id) {
          navigate(`/property-details/${property.id}`);
        } else {
          console.error("Property ID is undefined", property);
        }
      }}
    >
      {/* 🏠 Property Image with Overlay */}
      <div className="relative group">
        <img
          src={property.imageUrl}
          alt={property.propertyName}
          className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-300"></div>
        <span 
  className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-semibold shadow-md 
    ${property.rentingStatus === "Occupied" ? "bg-red-500 text-white" : "bg-green-300 text-[#1E1E2E]"}`}
>
  {property.rentingStatus}
</span>

      </div>

      {/* 📋 Property Details */}
      <div className="p-5">
        {/* 📍 Location and Features */}
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <FaBed className="mr-2 text-[#0E8388]" />
          <span>{property.numOfRooms} Bed</span>

          <FaBath className="ml-4 mr-2 text-[#0E8388]" />
          <span>{property.numOfBathrooms} Bath</span>

          <MdLocationOn className="ml-4 mr-2 text-[#0E8388]" />
          <span>{property.propertyAddress.city}</span>
        </div>

        {/* 🏡 Property Name */}
        <h3 className="text-xl font-bold text-gray-800 truncate">
          {property.propertyName}
        </h3>

        {/* 💰 Price & Funding */}
        <div className="flex justify-between items-center mt-2">
          <p className="text-[#0E8388] text-lg font-semibold">
            {property.propertyPrice.toLocaleString()} EGP
          </p>
          <p className="text-gray-500 text-sm font-semibold">
            {property.fundingPercentage}% Funded
          </p>
        </div>

        {/* 📈 Funding Progress Bar */}
        <div className="mt-3">
          <div className="w-full bg-gray-300 rounded-full h-2 relative">
            <div
              className="bg-[#0E8388] h-2 rounded-full transition-all duration-500"
              style={{ width: `${property.fundingPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* 📊 Financial Section */}
        <div className="mt-4 bg-white backdrop-blur-lg p-4 rounded-lg text-sm text-gray-700 shadow-md border border-gray-200">
          <div className="flex justify-between">
          <div className="flex items-center mt-2 space-x-2">
                <Banknote className="w-5 h-5 text-[#6A9C89]" /> {/* Money Icon */}
                <span className="font-medium text-gray-700 text-sm">Yearly Inv. Return:</span>
              </div>
              <span className="text-[#6A9C89] mt-2 font-bold">
                {`${parseFloat(property.yearlyInvestmentReturn).toLocaleString(undefined, { maximumFractionDigits: 2 })} EGP`}
              </span>
          </div>
          <div className="flex justify-between mt-2">
   <div className="flex items-center space-x-2 mt-2">
        <BarChart3 className="w-5 h-5 text-[#6A9C89]" /> {/* Bar Chart Icon */}
        <span className="font-medium text-gray-700 text-sm">Growth Value:</span>
      </div>
      <span className="text-[#6A9C89] font-bold mt-2">
        {`${parseFloat(property.propertyValueGrowthPercentage).toFixed(2)}%`}
      </span>
          </div>
          <div className="flex justify-between mt-3 mb-3">
    <div className="flex items-center space-x-2">
      <TrendingUp className="w-5 h-5 text-[#6A9C89]" /> {/* Appreciation Icon */}
      <span className="font-medium text-gray-700 text-sm">Appreciation Value:</span>
    </div>
    <span className="text-[#6A9C89] font-bold">
      {`${parseFloat(property.appreciationValue).toLocaleString(undefined, { maximumFractionDigits: 2 })} EGP`}
    </span>
          </div>
        </div>

        {/* ✏️ Edit Button */}
        <div className="flex mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevents card click from triggering navigation
              navigate(`/edit-property/${property.id}`);
            }}
            className="flex-1 bg-gradient-to-r from-[#0E8388] to-[#3d3d3d] text-white py-2 rounded-lg transition-all duration-300 hover:opacity-80 hover:shadow-lg"
          >
            Edit Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
