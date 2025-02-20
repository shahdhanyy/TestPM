import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProperty = ({ addProperty }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [property, setProperty] = useState({
    imageUrl: "",
    imageFile: null,
    propertyName: "",
    propertyType: "",
    numOfRooms: "",
    numOfBathrooms: "",
    propertyArea: "",
    floorNumber: "",
    propertyOverview: "",
    propertyAddress: {
      street: "",
      city: "",
      state: "",
      country: "",
    },
    propertyLongitude: "",
    propertyLatitude: "",
    propertyPrice: "",
    serviceFees: "",
    managementFees: "",
    maintenanceFees: "",
    operatingExpenses: "",
    appreciationRate: "",
    currentRent: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => {
      if (name.startsWith("propertyAddress.")) {
        const addressField = name.split(".")[1];
        return {
          ...prev,
          propertyAddress: {
            ...prev.propertyAddress,
            [addressField]: value,
          },
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      setProperty((prev) => ({
        ...prev,
        imageFile: file,
        imageUrl: reader.result,
      }));
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const validateFields = () => {
    const requiredFields = [
      "propertyName",
      "propertyType",
      "numOfRooms",
      "numOfBathrooms",
      "propertyArea",
      "floorNumber",
      "propertyOverview",
      "propertyLongitude",
      "propertyLatitude",
      "propertyPrice",
      "serviceFees",
      "managementFees",
      "maintenanceFees",
      "operatingExpenses",
      "appreciationRate",
      "currentRent",
      "propertyAddress.street",
      "propertyAddress.city",
      "propertyAddress.state",
      "propertyAddress.country",
    ];

    return requiredFields.every((field) => {
      const keys = field.split(".");
      let value = property;
      for (const key of keys) {
        if (!value[key]) return false;
        value = value[key];
      }
      return true;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      alert("Please fill in all required fields before submitting.");
      return;
    }

    const formData = new FormData();
    if (property.imageFile) {
      formData.append("imageFile", property.imageFile);
    }

    Object.entries(property).forEach(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        Object.entries(value).forEach(([subKey, subValue]) => {
          formData.append(`${key}.${subKey}`, subValue);
        });
      } else {
        formData.append(key, value);
      }
    });

    try {
      const response = await fetch("https://localhost:7183/api/Property/create", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Property added successfully:", result);
        navigate("/");
      } else {
        throw new Error("Failed to add property");
      }
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  

  // Go to next step
  const nextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 3));
  };

  // Go to previous step
  const prevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto  bg-white shadow-2xl rounded-lg">
      <h2 className="text-2xl font-bold text-gray-500 mb-3 text-center">
        Add New Property
      </h2>

      {/* Progress Bar */}
      <div className="relative mb-6">
        <div className="flex justify-between text-center mb-3">
          <div
            className={`w-1/3 py-2 font-semibold ${
              currentStep >= 1 ? "text-[#6A9C89]" : "text-gray-400"
            }`}
          >
            <span
              className={`inline-block w-8 h-8 rounded-full border-2 ${
                currentStep >= 1
                  ? "bg-[#6A9C89] text-white"
                  : "bg-white border-gray-400"
              }`}
            >
              1
            </span>
            <p>Step 1</p>
          </div>
          <div
            className={`w-1/3 py-2 font-semibold ${
              currentStep >= 2 ? "text-[#6A9C89]" : "text-gray-400"
            }`}
          >
            <span
              className={`inline-block w-8 h-8 rounded-full border-2 ${
                currentStep >= 2
                  ? "bg-[#6A9C89] text-white"
                  : "bg-white border-gray-400"
              }`}
            >
              2
            </span>
            <p>Step 2</p>
          </div>
          <div
            className={`w-1/3 py-2 font-semibold ${
              currentStep >= 3 ? "text-[#6A9C89]" : "text-gray-400"
            }`}
          >
            <span
              className={`inline-block w-8 h-8 rounded-full border-2 ${
                currentStep >= 3
                  ? "bg-[#6A9C89] text-white"
                  : "bg-white border-gray-400"
              }`}
            >
              3
            </span>
            <p>Step 3</p>
          </div>
        </div>
        <div className="h-1 bg-gray-300 absolute bottom-0 left-0 right-0">
          <div
            className="h-1 bg-[#6A9C89]"
            style={{
              width: `${(currentStep - 1) * 33.33}%`,
              transition: "width 0.3s ease-in-out",
            }}
          ></div>
        </div>
      </div>

      {/* Single Form Wrapping All Steps */}
      <form onSubmit={handleSubmit} className="space-y-8" noValidate>
        {/* Step 1: Basic Property Information */}
        {currentStep === 1 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-700 text-center mb-4">
              Basic Property Information
            </h3>

            {/* Image Upload (Required only if you want it on Step 1) */}
            <div>
              <label className="block text-gray-700 font-semibold">
                Upload Property Image
              </label>
              <input
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border rounded-xl w-full p-3 mb-3 focus:ring-2 focus:ring-[#6A9C89]"
                />
                
                {uploading && <p>Uploading image...</p>}
          {property.imageUrl && (
            <img
              src={property.imageUrl}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover"
            />
          )}
        </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold">
                  Property Name
                </label>
                <input
                  type="text"
                  name="propertyName"
                  value={property.propertyName}
                  onChange={handleChange}
                  className="border rounded-xl w-full p-3 mb-3 focus:ring-2 focus:ring-[#6A9C89]"
                />

                <label className="block text-gray-700 font-semibold">
                  Number of Rooms
                </label>
                <input
                  type="number"
                  name="numOfRooms"
                  value={property.numOfRooms}
                  onChange={handleChange}
                  className="border rounded-xl w-full p-3 mb-3 focus:ring-2 focus:ring-[#6A9C89]"
                />

                <label className="block text-gray-700 font-semibold">
                  Floor Number
                </label>
                <input
                  type="number"
                  name="floorNumber"
                  value={property.floorNumber}
                  onChange={handleChange}
                  className="border rounded-xl w-full p-3 mb-3 focus:ring-2 focus:ring-[#6A9C89]"
                />

                <label className="block text-gray-700 font-semibold">
                  Property Area
                </label>
                <input
                  type="number"
                  name="propertyArea"
                  value={property.propertyArea}
                  onChange={handleChange}
                  className="border rounded-xl w-full p-3 mb-1 focus:ring-2 focus:ring-[#6A9C89]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">
                  Property Type
                </label>
                <input
                  type="text"
                  name="propertyType"
                  value={property.propertyType}
                  onChange={handleChange}
                  className="border rounded-xl w-full p-3 mb-3 focus:ring-2 focus:ring-[#6A9C89]"
                />

                <label className="block text-gray-700 font-semibold">
                  Number of Bathrooms
                </label>
                <input
                  type="number"
                  name="numOfBathrooms"
                  value={property.numOfBathrooms}
                  onChange={handleChange}
                  className="border rounded-xl w-full p-3 mb-3 focus:ring-2 focus:ring-[#6A9C89]"
                />

                <label className="block text-gray-700 font-semibold">
                  Property Overview
                </label>
                <textarea
                  name="propertyOverview"
                  value={property.propertyOverview}
                  onChange={handleChange}
                  className="border rounded-xl w-full p-11 focus:ring-2 focus:ring-[#6A9C89]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Address and Location Details */}
        {currentStep === 2 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Address and Location Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold">
                  Street
                </label>
                <input
                  type="text"
                  name="propertyAddress.street"
                  value={property.propertyAddress.street}
                  onChange={handleChange}
                  className="border rounded-xl w-full p-3 mb-3 focus:ring-2 focus:ring-[#6A9C89]"
                />

                <label className="block text-gray-700 font-semibold">
                  City
                </label>
                <input
                  type="text"
                  name="propertyAddress.city"
                  value={property.propertyAddress.city}
                  onChange={handleChange}
                  className="border rounded-xl w-full p-3 mb-3 focus:ring-2 focus:ring-[#6A9C89]"
                />

                <label className="block text-gray-700 font-semibold">
                  Latitude
                </label>
                <input
                  type="text"
                  name="propertyLatitude"
                  value={property.propertyLatitude}
                  onChange={handleChange}
                  className="border rounded-xl w-full p-3 mb-3 focus:ring-2 focus:ring-[#6A9C89]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">
                  Country
                </label>
                <input
                  type="text"
                  name="propertyAddress.country"
                  value={property.propertyAddress.country}
                  onChange={handleChange}
                  className="border rounded-xl w-full p-3 mb-3 focus:ring-2 focus:ring-[#6A9C89]"
                />

                <label className="block text-gray-700 font-semibold">
                  State
                </label>
                <input
                  type="text"
                  name="propertyAddress.state"
                  value={property.propertyAddress.state}
                  onChange={handleChange}
                  className="border rounded-xl w-full p-3 mb-3 focus:ring-2 focus:ring-[#6A9C89]"
                />

                <label className="block text-gray-700 font-semibold">
                  Longitude
                </label>
                <input
                  type="text"
                  name="propertyLongitude"
                  value={property.propertyLongitude}
                  onChange={handleChange}
                  className="border rounded-xl w-full p-3 mb-3 focus:ring-2 focus:ring-[#6A9C89]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Financial Information */}
        {currentStep === 3 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Financial Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold">
                  Price (EGP)
                </label>
                <input
                  type="number"
                  name="propertyPrice"
                  value={property.propertyPrice}
                  onChange={handleChange}
                  className="border rounded-xl w-full p-3 mb-3 focus:ring-2 focus:ring-[#6A9C89]"
                />

                <label className="block text-gray-700 font-semibold">
                  Service Fees (EGP)
                </label>
                <input
                  type="number"
                  name="serviceFees"
                  value={property.serviceFees}
                  onChange={handleChange}
                  className="border rounded-xl w-full p-3 mb-3 focus:ring-2 focus:ring-[#6A9C89]"
                />

                <label className="block text-gray-700 font-semibold">
                  Management Fees (EGP)
                </label>
                <input
                  type="number"
                  name="managementFees"
                  value={property.managementFees}
                  onChange={handleChange}
                  className="border rounded-xl w-full p-3 mb-3 focus:ring-2 focus:ring-[#6A9C89]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">
                  Property Rent
                </label>
                <input
                  type="number"
                  name="currentRent"
                  value={property.currentRent}
                  onChange={handleChange}
                  className="border rounded-xl w-full p-3 mb-3 focus:ring-2 focus:ring-[#6A9C89]"
                />

                <label className="block text-gray-700 font-semibold">
                  Maintenance Fees (EGP)
                </label>
                <input
                  type="number"
                  name="maintenanceFees"
                  value={property.maintenanceFees}
                  onChange={handleChange}
                  className="border rounded-xl w-full p-3 mb-3 focus:ring-2 focus:ring-[#6A9C89]"
                />

                <label className="block text-gray-700 font-semibold">
                  Operating Expenses (EGP)
                </label>
                <input
                  type="number"
                  name="operatingExpenses"
                  value={property.operatingExpenses}
                  onChange={handleChange}
                  className="border rounded-xl w-full p-3 mb-3 focus:ring-2 focus:ring-[#6A9C89]"
                />

                <label className="block text-gray-700 font-semibold">
                  Appreciation Rate (%)
                </label>
                <input
                  type="float"
                  name="appreciationRate"
                  value={property.appreciationRate}
                  onChange={handleChange}
                  className="border rounded-xl w-full p-3 mb-3 focus:ring-2 focus:ring-[#6A9C89]"
                />
              </div>
            </div>
          </div>
        )}

{/* Navigation Buttons */}
<div className="flex justify-between mt-6">
  {currentStep === 2 && (
    <button
      type="button"
      onClick={prevStep}
      className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-700"
    >
      Previous
    </button>
  )}
    {currentStep === 3 && (
    <button
      type="button"
      onClick={prevStep}
      className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-700"
    >
      Previous
    </button>
  )}

  <div className="ml-auto">
    {currentStep === 1 && (
      <button
        type="button"
        onClick={nextStep}
        className="px-6 py-3 bg-[#6A9C89] text-white rounded-lg hover:bg-gray-700"
      >
        Next
      </button>
    )}
    {currentStep === 2 && (
      <button
        type="button"
        onClick={nextStep}
        className="px-6 py-3 bg-[#6A9C89] text-white rounded-lg hover:bg-gray-600"
      >
        Next
      </button>
    )}
    {currentStep === 3 && (
      <button
        type="submit"
        className="px-6 py-3 bg-[#6A9C89] text-white rounded-lg hover:bg-gray-600"
      >
        Submit
      </button>
    )}
  </div>
</div>

      </form>
    </div>
  );
};

export default AddProperty;
