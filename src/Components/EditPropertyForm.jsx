import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditPropertyForm = ({ propertyToEdit, updateProperty }) => {
  const navigate = useNavigate();
  const [property, setProperty] = useState({
    propertyName: propertyToEdit.propertyName || "",
    propertyType: propertyToEdit.propertyType || "",
    propertyAddress: propertyToEdit.propertyAddress || "",
    propertyPrice: propertyToEdit.propertyPrice || 0,
    fundingStatus: propertyToEdit.fundingStatus || "",
    rentingStatus: propertyToEdit.rentingStatus || "",
    fundingPercentage: propertyToEdit.fundingPercentage || 0,
    numOfRooms: propertyToEdit.numOfRooms || 0,
    numOfBathrooms: propertyToEdit.numOfBathrooms || 0,
    propertyArea: propertyToEdit.propertyArea || 0,
    floorNumber: propertyToEdit.floorNumber || 0,
    imageUrl: propertyToEdit.imageUrl || "",
    propertyOverview: propertyToEdit.propertyOverview || "",
    propertyLongitude: propertyToEdit.propertyLongitude || 0,
    propertyLatitude: propertyToEdit.propertyLatitude || 0,
    currentRent: propertyToEdit.currentRent || 0,
    serviceFees: propertyToEdit.serviceFees || 0,
    managementFees: propertyToEdit.managementFees || 0,
    maintenanceFees: propertyToEdit.maintenanceFees || 0,
    appreciationRate: propertyToEdit.appreciationRate || 0,
    fundingDate: propertyToEdit.fundingDate || "",
    sellingStatus: propertyToEdit.sellingStatus || "",
    numberOfInvestors: propertyToEdit.numberOfInvestors || 0,
    availablePrice: propertyToEdit.availablePrice || 0,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      updateProperty(property);
      navigate("/");
    } catch (error) {
      console.error("Error updating property:", error);
      alert("Failed to update the property. Try again please!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="bg-white shadow-md rounded-lg p-6 max-w-5xl mx-auto mt-10" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Edit Property</h2>
      {Object.keys(property).map((key) => (
        <div key={key} className="mb-4">
          <label className="block text-gray-700 font-semibold">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
          <input
            type={typeof property[key] === "number" ? "number" : "text"}
            name={key}
            value={property[key] || ""}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>
      ))}
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full mt-6">
        {loading ? "Updating..." : "Update Property"}
      </button>
    </form>
  );
};

export default EditPropertyForm;
