import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaBuilding,
  FaLayerGroup,
  FaChartLine,
  FaMoneyBillWave,
  FaHandHoldingUsd,
  FaArrowLeft, // Merged into the first import block
} from "react-icons/fa";

import { MdLocationOn } from "react-icons/md"; // Keeping this separate for clarity
import { Wrench } from "lucide-react";

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

const API_URL = "https://localhost:7183/api/Property";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("Property ID:", id); // Check if ID is correct
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`); // Fetch the specific property by ID

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProperty(data);
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
    return (
      <div className="p-6 text-center text-gray-700">
        Loading property details...
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto animate-fadeIn">
      {/* Back Button */}

      <a
        href="/"
        className="flex items-center mb-3 gap-2 text-[#0E8388] font-semibold hover:text-[#1E1E2E] transition-all duration-300 ease-in-out"
      >
        <FaArrowLeft className="text-xl mb-3 transform transition-transform duration-300 group-hover:-translate-x-1" />
        <span>Back to Listings</span>
      </a>

      {property && property.imageUrl ? (
        <div className="relative flex justify-center">
          <img
            src={property.imageUrl}
            alt={property.propertyName}
            className={`rounded-xl mb-5 object-cover transition-all duration-500 ease-in-out cursor-pointer shadow-lg 
        ${
          isExpanded
            ? "w-[100%] max-h-[80vh] mt-4 scale-105 shadow-2xl"
            : "w-[100%] h-96 mt-2 hover:scale-105 hover:shadow-xl"
        }`}
            onClick={toggleExpand}
          />
        </div>
      ) : (
        <div className="text-gray-500 text-center mt-4">No image available</div>
      )}

      {/* Property Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white shadow-lg rounded-xl p-10 space-y-6 transition-all duration-300 hover:shadow-2xl border border-gray-200">
          <h2 className="text-4xl font-extrabold text-[#1E1E2E]">
            {property.propertyName}
          </h2>
          {/* Location */}
          <p className="text-gray-700 text-lg flex items-center mt-3 sm:mt-0">
            <MdLocationOn className="mr-2 text-2xl text-[#0E8388]" />
            {`${property.propertyAddress.street}, ${property.propertyAddress.city}, ${property.propertyAddress.state}, ${property.propertyAddress.country}`}
          </p>
          {/* Property Attributes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-gray-700 text-lg mt-4">
            <p className="flex items-center">
              <FaBed className="mr-3 text-[#0E8388] text-xl" />{" "}
              {property.numOfRooms} Bed
            </p>
            <p className="flex items-center">
              <FaBath className="mr-3 text-[#0E8388] text-xl" />{" "}
              {property.numOfBathrooms} Bath
            </p>
            <p className="flex items-center">
              <FaRulerCombined className="mr-3 text-[#0E8388] text-xl" />{" "}
              {property.propertyArea} Sq.Ft
            </p>
            <p className="flex items-center">
              <FaBuilding className="mr-3 text-[#0E8388] text-xl" />{" "}
              {property.propertyType}
            </p>
            <p className="flex items-center">
              <FaLayerGroup className="mr-3 text-[#0E8388] text-xl" /> Floor{" "}
              {property.floorNumber}
            </p>
            <p className="flex items-center ">
              <FaMoneyBillWave className="mr-3 text-[#0E8388] text-lg" />{" "}
              {property.priceOfMeterSquare.toFixed(0)} EGP/Sq.Ft
            </p>
          </div>
          {/* 📝 Property Overview */}
          <h3 className="text-2xl font-bold text-[#1E1E2E]">
            Property Overview
          </h3>
          <p className="mt-3 text-gray-700 text-lg leading-relaxed">
            {property.propertyOverview}
          </p>

          {/* Property Status */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              Renting Status:
              <span
                className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold 
      ${
        property.rentingStatus === "Occupied"
          ? "bg-red-400 text-white"
          : "bg-green-300 text-[#1E1E2E]"
      }`}
              >
                {property.rentingStatus}
              </span>
            </h3>

            <div className="mt-4 flex flex-col md:flex-row items-center justify-between bg-white p-4 shadow-md rounded-lg border border-gray-200">
              {/* Left Side: Current Rent */}
              <div className="flex-1 text-center md:text-left">
                <p className="text-gray-600 text-sm">Current Monthly Rent</p>
                <p className="text-2xl font-bold text-[#0E8388]">
                  {property.currentRent} EGP
                </p>
              </div>

              {/* Right Side: Gross & Net Yield */}
              <div className="flex flex-col md:flex-row md:items-center md:space-x-6 mt-4 md:mt-0">
                <div className="text-center">
                  <p className="text-gray-500 text-sm">Annual Gross Yield</p>
                  <p className="text-lg font-semibold text-[#0E8388]">
                    {property.annualGrossYield.toFixed(2)}%
                  </p>
                </div>
                <div className="text-center border-l md:border-l-2 md:pl-6 border-gray-300">
                  <p className="text-gray-500 text-sm">Annual Net Yield</p>
                  <p className="text-lg font-semibold text-[#0E8388]">
                    {property.netYield.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg hover:shadow-2xl p-10 rounded-2xl border border-gray-200 transition-all duration-300 transform ">
        {/* 🏡 Property Price */}
          <h3 className="text-gray-400 text-xl font-semibold font-serif text-center mt-2 mb-3">
            Property Price
          </h3>
          <p className="text-[#0E8388] mb-3 font-sans text-2xl font-bold text-center">
            {`${property.propertyPrice.toLocaleString()} EGP`}
          </p>

          {/* 📊 Investment Progress */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#6A9C89] to-[#3d3d3d] transition-all duration-700 ease-in-out"
                style={{
                  width: `${property.fundingPercentage}%`,
                  maxWidth: "100%",
                }}
              ></div>
            </div>
            <p className="text-gray-500 text-sm mt-2 font-medium text-right">
              {property.fundingPercentage}% Funded
            </p>
          </div>

          {/* 💰 Investment Details */}
          <div className="mt-6 space-y-4 text-gray-900 text-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-[#6A9C89]" />
                <span className="font-medium text-gray-700 text-sm">
                  Total Investors:
                </span>
              </div>
              <span className="text-[#6A9C89] font-bold">
                {property.numberOfInvestors}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-6 text-[#6A9C89]" />
                <span className="font-medium text-gray-700 text-sm">
                  Available:
                </span>
              </div>
              <span className="text-[#6A9C89]  font-bold">
                {`${property.availablePrice.toLocaleString()} EGP`}
              </span>
            </div>
          </div>

          {/* 📅 Funded Date */}
          <div className="mt-6 flex">
            <div className="flex  space-x-2"></div>
            <span className="text-red-500 font-natural text-xs text-center">
              {new Date(property.fundingDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <hr className="my-6 border-gray-300" />

{/* 📈 Investment Growth & Yield */}
<div className="mt-8 mb-6 space-y-4 text-sm"> 
  {/* Appreciation Value */}
  <div className="flex justify-between items-center">
    <div className="flex items-center space-x-2">
      <TrendingUp className="w-5 h-5 text-[#6A9C89]" /> {/* Appreciation Icon */}
      <span className="font-medium text-gray-700 text-sm">Appreciation Value:</span>
    </div>
    <span className="text-[#6A9C89] font-bold">
      {`${parseFloat(property.appreciationValue).toLocaleString(undefined, { maximumFractionDigits: 2 })} EGP`}
    </span>
  </div>

  {/* Appreciation Rate */}
  <div className="flex justify-between items-center">
    <div className="flex items-center mt-2 space-x-2">
      <Percent className="w-5 h-5 text-[#6A9C89]" /> {/* Percentage Icon */}
      <span className="font-medium text-gray-700 text-sm">Appreciation Rate:</span>
    </div>
    <span className="text-[#6A9C89] mt-2 font-bold">
      {`${parseFloat(property.appreciationRate).toFixed(2)}%`}
    </span>
  </div>

  {/* Growth Value */}
  <div className="flex justify-between items-center ">
    <div className="flex items-center space-x-2 mt-2">
      <BarChart3 className="w-5 h-5 text-[#6A9C89]" /> {/* Bar Chart Icon */}
      <span className="font-medium text-gray-700 text-sm">Growth Value:</span>
    </div>
    <span className="text-[#6A9C89] font-bold mt-2">
      {`${parseFloat(property.propertyValueGrowthPercentage).toFixed(2)}%`}
    </span>
  </div>

  {/* Yearly Investment Return */}
  <div className="flex justify-between items-center">
    <div className="flex items-center mt-2 space-x-2">
      <Banknote className="w-5 h-5 text-[#6A9C89]" /> {/* Money Icon */}
      <span className="font-medium text-gray-700 text-sm">Yearly Inv. Return:</span>
    </div>
    <span className="text-[#6A9C89] mt-2 font-bold">
      {`${parseFloat(property.yearlyInvestmentReturn).toLocaleString(undefined, { maximumFractionDigits: 2 })} EGP`}
    </span>
  </div>

  {/* Annual Gross Rent */}
  <div className="flex justify-between items-center">
    <div className="flex items-center mt-2 space-x-2">
      <Home className="w-5 h-5 text-[#6A9C89]" /> {/* Home Icon for Rent */}
      <span className="font-medium text-gray-700 text-sm"> Gross Rent:</span>
    </div>
    <span className="text-[#6A9C89] mt-2 font-bold">
      {`${parseFloat(property.annualGrossRent).toLocaleString(undefined, { maximumFractionDigits: 2 })} EGP`}
    </span>
  </div>
</div>

        </div>
      </div>

      <div className="mt-8 p-6 bg-white shadow-lg rounded-lg transition-all duration-300 hover:shadow-2xl border border-gray-200">
  {/* 📍 Location Title */}
  <div className="flex items-center space-x-3 mb-4">
    <h3 className="text-2xl font-bold text-[#1E1E2E]">Property Location</h3>
  </div>

  {/* 📌 Address Details */}
  <p className="text-gray-700 text-lg mb-3 flex items-center">
    <MdLocationOn className="mr-1 text-xl text-[#0E8388]" /> 
    {`${property.propertyAddress.street}, ${property.propertyAddress.city}, ${property.propertyAddress.state}, ${property.propertyAddress.country}`}
  </p>

  {/* 🌍 Map Section */}
  <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-md border border-gray-300">
    <iframe
      title="Property Location"
      className="w-full h-full rounded-lg transition-all duration-500 hover:scale-105"
      src={`https://www.openstreetmap.org/export/embed.html?bbox=${
        property.propertyLongitude - 0.01
      },${property.propertyLatitude - 0.01},${
        property.propertyLongitude + 0.01
      },${property.propertyLatitude + 0.01}&layer=mapnik&marker=${
        property.propertyLatitude
      },${property.propertyLongitude}`}
      allowFullScreen
    ></iframe>
    {/* Map Link */}
    <div className="text-center">
            <a
              href={`https://www.google.com/maps?q=${property.propertyLatitude},${property.propertyLongitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              View on Google Maps
            </a>
          </div>
  </div>
</div>


      {/* 💰 Financial Breakdown Section */}
<div className="mt-8 bg-white shadow-lg p-6 rounded-lg transition-all duration-300 hover:shadow-2xl border border-gray-200">
  {/* 📊 Section Title with Icon */}
  <div className="flex items-center space-x-3 mb-4">
    <BarChart3 className="text-[#1E1E2E] w-6 h-6" />
    <h3 className="text-2xl font-bold text-[#1E1E2E]">Financial Breakdown</h3>
  </div>

  {/* 📌 Annual Gross Rent */}
  <div className="flex justify-between items-center border-b py-3 text-lg">
    <div className="flex items-center space-x-2">
      <Home className="text-[#6A9C89] w-5 h-5" />
      <p className="text-gray-600">Annual Gross Rent</p>
    </div>
    <p className="font-semibold text-gray-900">{property.annualGrossRent.toLocaleString()} EGP</p>
  </div>

  {/* 📉 Service Charges */}
  <div className="flex justify-between items-center border-b py-3 text-lg">
    <div className="flex items-center space-x-2">
      <DollarSign className="text-red-500 w-5 h-5" />
      <p className="text-gray-600">Service Charges</p>
    </div>
    <p className="font-semibold text-red-500">- {property.serviceFees.toLocaleString()} EGP</p>
  </div>

  {/* 🛠️ Management Fees */}
  <div className="flex justify-between items-center border-b py-3 text-lg">
    <div className="flex items-center space-x-2">
      <Users className="text-red-500 w-5 h-5" />
      <p className="text-gray-600">Management Fees</p>
    </div>
    <p className="font-semibold text-red-500">- {property.managementFees.toLocaleString()} EGP</p>
  </div>

  {/* 🏠 Maintenance Fees */}
  <div className="flex justify-between items-center border-b py-3 text-lg">
    <div className="flex items-center space-x-2">
      <Wrench className="text-red-500 w-5 h-5" />
      <p className="text-gray-600">Maintenance Fees</p>
    </div>
    <p className="font-semibold text-red-500">- {property.maintenanceFees.toLocaleString()} EGP</p>
  </div>

  {/* 📈 Appreciation Value */}
  <div className="flex justify-between items-center border-b border-gray-400 py-3 text-lg">
    <div className="flex items-center space-x-2">
      <TrendingUp className="text-green-600 w-5 h-5" />
      <p className="text-gray-600">Appreciation Value</p>
    </div>
    <p className="font-semibold text-green-600">+ {property.appreciationValue.toLocaleString()} EGP</p>
  </div>

  {/* 🏆 Annual Net Income */}
  <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mt-4 text-lg">
    <div className="flex items-center space-x-2">
      <Banknote className="text-blue-600 w-6 h-6" />
      <p className="text-xl font-bold text-gray-900">Annual Net Income</p>
    </div>
    <p className="text-xl font-bold text-blue-600">= {property.annualNetIncome.toLocaleString()} EGP</p>
  </div>

  {/* 📌 Disclaimer */}
  <p className="mt-2 text-sm text-gray-500 text-center">
    (This calculation is based on 1-year ownership)
  </p>
</div>

      <div className="flex mt-4">
  <button
    onClick={() => {
      if (property.id) {
        navigate(`/edit-property/${property.id}`);
      } else {
        console.error("Property ID is undefined, cannot navigate to edit form.");
      }
      
    }}
    className="flex-1 bg-gradient-to-r from-[#0E8388] to-[#3d3d3d] text-white py-2 rounded-lg transition-all duration-300 hover:opacity-80 hover:shadow-lg"
  >
    Edit Property
  </button>
</div>



    </div>
  );
};

export default PropertyDetails;
