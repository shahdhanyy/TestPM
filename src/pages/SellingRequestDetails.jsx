import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Mail, Phone, BadgeCheck, Home, MapPin, DollarSign, Bed, Layers, Bath, UserCircle, Building2
} from "lucide-react";

const API_URL = "https://localhost:7183/api/PropertyOffer/pending";

const SellingRequestDetails = () => {
  const { offerID } = useParams();
  const navigate = useNavigate();
  console.log("request ID:", offerID); // Check if ID is correct


  const [activeTab, setActiveTab] = useState("user");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [financialData, setFinancialData] = useState({
    serviceFees: "",
    managementFees: "",
    currentRent: "",
    maintenanceFees: "",
    operatingExpenses: "",
    appreciationRate: "",
  });

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        // Ensure the URL is correctly constructed
        const response = await fetch(`${API_URL}/${offerID}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setRequest(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    if (offerID) fetchRequest();
  }, [offerID]);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!request) return <p>No details found.</p>;
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinancialData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await fetch(`https://localhost:7183/api/PropertyOffer/accept/${offerID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(financialData),
      });

      if (response.ok) {
        alert("Financial data submitted successfully!");
        setIsModalOpen(false);
      } else {
        alert("Error submitting data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const validateFields = () => {
    return Object.values(financialData).every(value => value !== "");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <div className="flex items-center justify-center min-h-screen bg-[gray-100] p-6">
      <div className="bg-white shadow-2xl rounded-t-3xl border border-gray-300 w-full max-w-4xl flex flex-col overflow-hidden">
        <div className="flex w-full">
          <button
            onClick={() => setActiveTab("user")}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-lg font-semibold transition-all duration-300 ${
              activeTab === "user"
                ? "bg-gradient-to-r from-[#4C8577] to-[#65A18E] text-white shadow-md border-b-4 border-[#4C8577]"
                : "text-gray-500 bg-gray-100 hover:bg-gradient-to-r hover:from-[#E3F1EE] hover:to-[#C8E4DA] hover:text-[#4C8577]"
            }`}
          >
            <UserCircle
              className={`w-5 h-5 ${
                activeTab === "user" ? "text-white" : "text-gray-400"
              }`}
            />
            User Info
          </button>

          <button
            onClick={() => setActiveTab("property")}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-lg font-semibold transition-all duration-300 ${
              activeTab === "property"
                ? "bg-gradient-to-r from-[#4C8577] to-[#65A18E] text-white shadow-md border-b-4 border-[#4C8577]"
                : "text-gray-500 bg-gray-100 hover:bg-gradient-to-r hover:from-[#E3F1EE] hover:to-[#C8E4DA] hover:text-[#4C8577]"
            }`}
          >
            <Building2
              className={`w-5 h-5 ${
                activeTab === "property" ? "text-white" : "text-gray-400"
              }`}
            />
            Property Info
          </button>
        </div>

        {/* Content Section */}
        <div className="p-8 flex-1">
          {activeTab === "user" ? (
            <div className="flex flex-col items-center">
              <img
                src={request.profileImage}
                alt="User"
                className="w-32 h-32 rounded-full border-4 border-gray-300 mb-4 shadow-md"
              />
              <h3 className="text-2xl font-semibold text-gray-800">
                {request.userName}
              </h3>
              <div className="mt-4 text-gray-600 space-y-3 text-lg text-center">
                <p className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#4C8577]" /> {request.userEmail}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-[#4C8577]" /> {request.userPhoneNumber}
                </p>
                <p className="flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5 text-[#4C8577]" />{" "}
                  {request.userNationalIdNumber}
                </p>
              </div>

              {/* Larger National ID and Property Ownership Document */}
              <div className="mt-6 w-full max-w-md">
                <h4 className="text-lg font-semibold text-gray-700 text-center mb-2">
                  National ID Image
                </h4>
                <img
                  src={
                    "https://localhost:7183/Resources/Properties/db5fc191-ceaa-4976-a658-b159ea1385de.jpg"
                  }
                  alt="National ID"
                  className="w-full h-auto rounded-lg shadow-lg border-2 border-gray-300"
                />
              </div>

              <div className="mt-6 w-full max-w-md">
                <h4 className="text-lg font-semibold text-gray-700 text-center mb-2">
                  Property Ownership Document
                </h4>
                <img
                  src={
                    "https://localhost:7183/Resources/Properties/db5fc191-ceaa-4976-a658-b159ea1385de.jpg"
                  }
                  alt="Ownership Document"
                  className="w-full h-auto rounded-lg shadow-lg border-2 border-gray-300"
                />
              </div>
            </div>
          ) : (
            <div>
              {/* Property Image */}
              <img
                src={request.imageUrl}
                alt="Property"
                className="w-full h-80 object-cover rounded-lg mb-6 shadow-lg transition-all duration-300 hover:scale-105"
              />

              {/* Property Details */}
              <h3 className="text-3xl font-semibold text-gray-800">
                {request.propertyName}
              </h3>
              <p className="text-gray-500 text-lg">{request.propertyType}</p>

              {/* Property Specs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4 text-gray-700 text-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#4C8577]" />
                  <span className="font-medium">Address:</span>{" "}
                  {request.propertyAddress.street},{" "}
                  {request.propertyAddress.city}
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[#4C8577]" />
                  <span className="font-medium">Price:</span>{" "}
                  {request.propertyPrice.toLocaleString()} EGP
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#4C8577]" />
                  <span className="font-medium">Area:</span>{" "}
                  {request.propertyArea} sqm
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="w-5 h-5 text-[#4C8577]" />
                  <span className="font-medium">Rooms:</span>{" "}
                  {request.numOfRooms}
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="w-5 h-5 text-[#4C8577]" />
                  <span className="font-medium">Bathrooms:</span>{" "}
                  {request.numOfBathrooms}
                </div>
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-[#4C8577]" />
                  <span className="font-medium">Floor:</span>{" "}
                  {request.floorNumber}
                </div>
              </div>

              {/* Overview Section */}
              <div className="mt-6">
                <h4 className="text-xl font-semibold text-gray-700">
                  Property Overview
                </h4>
                <p className="text-gray-600 mt-2">
                  {request.propertyOverview}
                </p>
              </div>

              {/* Map Section */}
              <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-md border border-gray-300 flex flex-col mt-6">
                <iframe
                  title="Property Location"
                  className="w-full h-full rounded-lg transition-all duration-300 hover:scale-105"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                    request.propertyLongitude - 0.01
                  },${request.propertyLatitude - 0.01},${
                    request.propertyLongitude + 0.01
                  },${request.propertyLatitude + 0.01}&layer=mapnik&marker=${
                    request.propertyLatitude
                  },${request.propertyLongitude}`}
                  allowFullScreen
                ></iframe>
                <div className="text-center mt-2">
                  <a
                    href={`https://www.google.com/maps?q=${request.propertyLatitude},${request.propertyLongitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 bg-white border-t border-gray-200 shadow-md">
          {/* Delete Button */}
          <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95">
            🗑 Delete
          </button>

          {/* Accept & Proceed Button */}
          <button
  onClick={() => setIsModalOpen(true)}
  className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-[#4C8577] to-[#65A18E] rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
>
  ✅ Accept & Set Financial Data
</button>

        </div>
      </div>
      
{/* Modal */}
{isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in">
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl transform scale-95 animate-scale-in">
      {/* Modal Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Enter Financial Data
        </h2>
        <button
          onClick={() => setIsModalOpen(false)}
          className="text-gray-500 hover:text-red-600 transition duration-200"
        >
          ✖
        </button>
      </div>

      {/* Financial Data Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "Service Fees (EGP)", name: "serviceFees" },
          { label: "Management Fees (EGP)", name: "managementFees" },
          { label: "Property Rent", name: "currentRent" },
          { label: "Maintenance Fees (EGP)", name: "maintenanceFees" },
          { label: "Operating Expenses (EGP)", name: "operatingExpenses" },
          { label: "Appreciation Rate (%)", name: "appreciationRate" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-gray-700 font-semibold mb-1">
              {field.label}
            </label>
            <input
              type="number"
              name={field.name}
              value={financialData[field.name]}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#4C8577] focus:border-[#4C8577] transition-all duration-300 bg-gray-50"
            />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-6 py-3 text-lg font-semibold text-gray-700 bg-gray-200 rounded-lg transition-all duration-300 hover:bg-gray-300 hover:scale-105"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-[#4C8577] to-[#65A18E] rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
)}





    </div>
  );
};

export default SellingRequestDetails;
