import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProperty = ({ addProperty }) => {
  const [property, setProperty] = useState({
    propertyName: "",
    propertyType: "",
    address: "",
    numOfRooms: "",
    numOfBathrooms: "",
    propertyArea: "",
    floorNumber: "",
    price: "",
    investmentPercentage: "",
    numberOfInvestors: "",
    rentalIncome: "",
    growthValue: "",
    appreciationValue: "",
    fundingDate: "",
    ownershipDate: "",
    firstRentalDate: "",
    totalInvestmentReturn: "",
    initialInvestment: "",
    rentalYield: "",
    transactionCosts: "",
    investmentCost: "",
    longitude: "",
    latitude: "",
    imageUrl: "",
    status: "Available",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProperty({ ...property, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProperty(property);
    navigate("/");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-600 mb-6">Add New Property</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          <label className="block text-gray-700 font-semibold">Property Name</label>
          <input type="text" name="propertyName" value={property.propertyName} onChange={handleChange} className="border rounded w-full p-2 mb-4" required />

          <label className="block text-gray-700 font-semibold">Property Type</label>
          <input type="text" name="propertyType" value={property.propertyType} onChange={handleChange} className="border rounded w-full p-2 mb-4" required />

          <label className="block text-gray-700 font-semibold">Address</label>
          <input type="text" name="address" value={property.address} onChange={handleChange} className="border rounded w-full p-2 mb-4" required />

          <label className="block text-gray-700 font-semibold">Number of Rooms</label>
          <input type="number" name="numOfRooms" value={property.numOfRooms} onChange={handleChange} className="border rounded w-full p-2 mb-4" required />

          <label className="block text-gray-700 font-semibold">Number of Bathrooms</label>
          <input type="number" name="numOfBathrooms" value={property.numOfBathrooms} onChange={handleChange} className="border rounded w-full p-2 mb-4" required />

          <label className="block text-gray-700 font-semibold">Property Area (Sq.Ft)</label>
          <input type="text" name="propertyArea" value={property.propertyArea} onChange={handleChange} className="border rounded w-full p-2 mb-4" required />

          <label className="block text-gray-700 font-semibold">Floor Number</label>
          <input type="number" name="floorNumber" value={property.floorNumber} onChange={handleChange} className="border rounded w-full p-2 mb-4" required />

          <label className="block text-gray-700 font-semibold">Longitude</label>
          <input type="text" name="longitude" value={property.longitude} onChange={handleChange} className="border rounded w-full p-2 mb-4" required />

          <label className="block text-gray-700 font-semibold">Latitude</label>
          <input type="text" name="latitude" value={property.latitude} onChange={handleChange} className="border rounded w-full p-2 mb-4" required />
        </div>

        {/* Right Column */}
        <div>
          <label className="block text-gray-700 font-semibold">Price (AED)</label>
          <input type="text" name="price" value={property.price} onChange={handleChange} className="border rounded w-full p-2 mb-4" required />

          <label className="block text-gray-700 font-semibold">Investment Percentage</label>
          <input type="text" name="investmentPercentage" value={property.investmentPercentage} onChange={handleChange} className="border rounded w-full p-2 mb-4" required />

          <label className="block text-gray-700 font-semibold">Number of Investors</label>
          <input type="text" name="numberOfInvestors" value={property.numberOfInvestors} onChange={handleChange} className="border rounded w-full p-2 mb-4" required />

          <label className="block text-gray-700 font-semibold">Rental Income (AED/month)</label>
          <input type="text" name="rentalIncome" value={property.rentalIncome} onChange={handleChange} className="border rounded w-full p-2 mb-4" required />

          <label className="block text-gray-700 font-semibold">Status</label>
          <select name="status" value={property.status} onChange={handleChange} className="border rounded w-full p-2 mb-4">
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
            <option value="Rented">Rented</option>
          </select>

          {/* Image Upload */}
          <label className="block text-gray-700 font-semibold">Upload Property Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="border rounded w-full p-2 mb-4" />

          {/* Show Image Preview if Uploaded */}
          {property.imageUrl && <img src={property.imageUrl} alt="Property Preview" className="w-full h-52 object-cover rounded-lg mb-4" />}
        </div>

        {/* Submit Button - Spanning Full Width */}
        <div className="col-span-1 md:col-span-2">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full mt-4">Add Property</button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
