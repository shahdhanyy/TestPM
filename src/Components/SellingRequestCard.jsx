import React, { useState } from "react";
import { FaBed, FaBath } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SellingRequestCard = ({ request, onDelete }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Track delete request state

  const handleDelete = async () => {
    if (!request?.offerID) {
      console.error("Offer ID is undefined or null.");
      return;
    }
  
    const confirmDelete = window.confirm("Are you sure you want to delete this request?");
    if (!confirmDelete) return;
  
    setLoading(true);
    try {
      console.log("Deleting request with ID:", request.offerID);
  
      const response = await fetch(
        `https://localhost:7183/api/PropertyOffer/decline/${request.offerID}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete request");
      }
  
      alert("Property request deleted successfully!");
      onDelete(request.offerID);
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div
      className="flex flex-col md:flex-row w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition transform hover:scale-105 hover:shadow-xl cursor-pointer"
    >
      {/* Left: Image Section with Date Overlay */}
      <div className="relative md:w-1/3 w-full h-48 md:h-auto">
        <img
          src={request.imageUrl}
          alt={request.propertyName}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-white bg-opacity-75 px-2 py-1 rounded-md text-xs font-semibold text-gray-800">
          {request.offerDate}
        </div>
      </div>

      {/* Right: Details Section */}
      <div className="flex flex-col justify-between p-6 md:w-2/3">
        <div>
          {/* Property Name & User */}
          <h3 className="text-2xl font-bold text-gray-800">{request.propertyName}</h3>
          <p className="text-lg text-gray-500 mt-1">By {request.userName}</p>

          {/* Price */}
          <p className="mt-3 text-xl font-bold text-[#0E8388]">
            {request.propertyPrice.toLocaleString()} EGP
          </p>

          {/* Address */}
          <div className="mt-2 flex items-center text-gray-600 text-sm">
            <MdLocationOn className="mr-1 text-[#0E8388]" />
            <span>{request.propertyAddress.street}, {request.propertyAddress.city}</span>
          </div>

          {/* Area */}
          <div className="mt-1 text-gray-600 text-sm">
            <span>Area: {request.propertyArea} sqft</span>
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className="mt-3 flex items-center gap-6 text-gray-600 text-sm">
            <div className="flex items-center gap-1">
              <FaBed className="text-[#0E8388]" />
              <span>{request.numOfRooms} Bed</span>
            </div>
            <div className="flex items-center gap-1">
              <FaBath className="text-[#0E8388]" />
              <span>{request.numOfBathrooms} Bath</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => handleDelete(request.offerID)}
            disabled={loading}
            className={`flex-1 py-2 rounded-md shadow-sm transition duration-300 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 text-white"}`}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

          <button
             onClick={() => {
              console.log("Navigating to requeat details with ID:", request.offerID);
              if (request.offerID) {
                navigate(`/request-details/${request.offerID}`);
              } else {
                console.error("request ID is undefined", request);
              }
            }}
            className="flex-1 bg-gradient-to-r from-[#0E8388] to-[#3d3d3d] text-white py-2 rounded-md shadow-sm hover:opacity-90 transition duration-300"
          >
            Review Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellingRequestCard;
