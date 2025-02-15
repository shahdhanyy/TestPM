import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaBed, FaBath, FaRulerCombined, FaBuilding, FaLayerGroup,
  FaChartLine, FaMoneyBillWave, FaHandHoldingUsd
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const API_URL = "https://localhost:7183/api/Property"; 
const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(API_URL); // Fetch full list
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // Find the property by id
        const selectedProperty = data.find((prop) => prop.id.toString() === id);

        if (!selectedProperty) {
          throw new Error("Property not found!");
        }

        setProperty(selectedProperty);
      } catch (error) {
        console.error("Error fetching property:", error);
        setError("Unable to load property details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center text-gray-700">Loading property details...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto animate-fadeIn">
      {/* Back Button */}
      <a href="/" className="text-blue-500 flex items-center mb-4 hover:underline">← Back to Listings</a>

      {/* Property Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <img src={property.imageUrl} alt={property.propertyName} className="w-full h-80 object-cover rounded-md" />
      </div>
      

      {/* Property Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white shadow-lg p-6 rounded-lg space-y-4 transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-900">{property.propertyName}</h2>
   {/* Location */}
   <p className="text-gray-900 text-lg mt-4 flex items-center"><MdLocationOn className="mr-1 text-xl text-red-500" /> {property.PropertyAddress}</p>
        {/* Property Attributes */}
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-gray-600 mt-2">
  <p className="flex items-center">
    <FaBed className="mr-1 text-blue-500" /> {property.numOfRooms} Bed
  </p>
  <p className="flex items-center">
    <FaBath className="mr-1 text-blue-500" /> {property.numOfBathrooms} Bath
  </p>
  <p className="flex items-center">
    <FaRulerCombined className="mr-1 text-blue-500" /> {property.propertyArea} Sq.Ft
  </p>
  <p className="flex items-center">
    <FaBuilding className="mr-1 text-blue-500" /> {property.propertyType}
  </p>
  <p className="flex items-center">
    <FaLayerGroup className="mr-1 text-blue-500" /> Floor {property.floorNumber}
  </p>
  <p className="flex items-center">
    <FaMoneyBillWave className="mr-1 text-blue-500" /> AED {property.priceOfMeterSquare} / Sq.Ft
  </p>
</div>


       

{/* Property Status */}
<div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-sm">
  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
     Renting Status: 
    <span className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold 
      ${property.rentingStatus === "Occupied" ? "bg-green-500 text-white" : "bg-yellow-500 text-gray-900"}`}>
      {property.rentingStatus}
    </span>
  </h3>

  <div className="mt-4 flex flex-col md:flex-row items-center justify-between bg-white p-4 shadow-md rounded-lg border border-gray-200">
    {/* Left Side: Current Rent */}
    <div className="flex-1 text-center md:text-left">
      <p className="text-gray-600 text-sm">Current Monthly Rent</p>
      <p className="text-2xl font-bold text-green-600">AED {property.currentRent}</p>
    </div>

    {/* Right Side: Gross & Net Yield */}
    <div className="flex flex-col md:flex-row md:items-center md:space-x-6 mt-4 md:mt-0">
      <div className="text-center">
        <p className="text-gray-500 text-sm">Annual Gross Yield</p>
        <p className="text-lg font-semibold text-blue-500">{property.annualGrossYield}%</p>
      </div>
      <div className="text-center border-l md:border-l-2 md:pl-6 border-gray-300">
        <p className="text-gray-500 text-sm">Annual Net Yield</p>
        <p className="text-lg font-semibold text-purple-500">{property.projectedNetYield}%</p>
      </div>
    </div>
  </div>
</div>

        </div>

{/* Financial Summary */}
<div className="bg-white shadow-lg p-6 rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-2xl">
  <h3 className="text-gray-500 text-lg font-semibold mb-2"> Property Price</h3>
  <p className="text-green-600 text-4xl font-bold">AED {property.propertyPrice}</p>

  {/* Investment Progress Bar */}
  <div className="mt-4">
    <div className="w-full bg-gray-200 rounded-full h-3 relative">
      <div
        className="bg-green-500 h-3 rounded-full transition-all duration-500"
        style={{ width: `${property.fundingPercentage}%`, maxWidth: "100%" }}
      ></div>
    </div>
    <p className="text-gray-700 text-sm mt-2 font-semibold">
      {property.fundingPercentage}% Funded
    </p>
  </div>

  {/* Investment Details */}
  <div className="mt-4 space-y-2 text-gray-800 text-sm">
    <p className="flex justify-between items-center">
      <span className="font-medium">👥 Total Investors:</span>
      <span className="font-semibold">{property.numberOfInvestors}</span>
    </p>
    <p className="flex justify-between items-center">
      <span className="font-medium"> Available for Investment:</span>
      <span className="font-semibold text-green-600">AED {property.availablePrice}</span>
    </p>
  </div>

  {/* Funded Date */}
  <p className="text-red-500 text-sm font-semibold mt-3">
     Funded Date: {property.fundingDate}
  </p>

  <hr className="my-4" />

  {/* Yield & Investment Return */}
  <div className="mt-4 text-sm space-y-3">
    <p className="flex justify-between items-center">
      <span className="text-gray-600 flex items-center">
        Annual Gross Yield:
      </span>
      <span className="font-semibold text-blue-500">{property.annualGrossYield}%</span>
    </p>
    <p className="flex justify-between items-center">
      <span className="text-gray-600 flex items-center">
        Projected Net Yield:
      </span>
      <span className="font-semibold text-purple-500">{property.projectedNetYield}%</span>
    </p>
    <p className="flex justify-between items-center">
      <span className="text-gray-600 flex items-center">
        Total Investment Return:
      </span>
      <span className="font-semibold text-green-700">
        AED {property.totalInvestmentReturn} in 5 years
      </span>
    </p>
  </div>
</div>

      </div>

      {/* Property Overview under Location */}
      <div className="mt-8 p-6 bg-white shadow-lg rounded-lg transition-all duration-300 hover:shadow-2xl">
        <h3 className="text-xl font-bold">Property Location</h3>
        <p className="text-gray-500 mt-4 flex items-center"><MdLocationOn className="mr-1 text-gray-500" /> {property.PropertyAddress}</p>

        <iframe
          title="Property Location"
          className="w-full h-64 mt-4 rounded-lg"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${property.propertyLongitude - 0.01},${property.propertyLatitude - 0.01},${property.propertyLongitude + 0.01},${property.propertyLatitude + 0.01}&layer=mapnik&marker=${property.propertyLatitude},${property.propertyLongitude}`}
          allowFullScreen
        ></iframe>


        {/* Property Overview */}
        <h3 className="text-xl font-bold mt-6"> Property Overview</h3>
        <p className="mt-4 text-gray-700">{property.propertyOverview}</p>
      </div>

{/* Financial Breakdown Section */}
<div className="mt-8 bg-white shadow-lg p-6 rounded-lg transition-all duration-300 hover:shadow-2xl">
  <h3 className="text-xl font-bold">📊 Financial Breakdown</h3>
  
  <div className="flex justify-between border-b py-3">
    <p className="text-gray-600">Projected Gross Rent</p>
    <p className="font-semibold text-lg text-gray-900">AED {property.annualGrossRent}</p>
  </div>
  <div className="flex justify-between border-b py-3">
    <p className="text-gray-600">Service Charges</p>
    <p className="font-semibold text-lg text-red-500">- AED {property.serviceFees}</p>
  </div>
  <div className="flex justify-between border-b py-3">
    <p className="text-gray-600">Management Fees</p>
    <p className="font-semibold text-lg text-red-500">- AED {property.managementFees}</p>
  </div>
  <div className="flex justify-between border-b border-gray-500 py-3">
    <p className="text-gray-600">Maintenance Fees</p>
    <p className="font-semibold text-lg text-red-500">- AED {property.maintainenanceFees}</p>
  </div>

  {/* Appreciation Value */}
  <div className="flex justify-between border-b py-3">
    <p className="text-gray-600">📈 Appreciation Value</p>
    <p className="font-semibold text-lg text-orange-600">+ AED {property.appreciationValue}</p>
  </div>

  <div className="flex justify-between py-3">
    <p className="text-xl font-bold text-gray-900">Annual Net Income</p>
    <p className="text-xl font-bold text-green-600">= AED {property.annualNetIncome}</p>
  </div>
  <p className="mt-1 text-xm text-gray-500 text-center">(this calculation is for 1-year ownership)</p>
</div>

    </div>
  );
};

export default PropertyDetails;
