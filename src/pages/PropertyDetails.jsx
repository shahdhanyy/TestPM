// src/pages/PropertyDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";

const propertyRequests = [
  {
    id: 1,
    user: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    property: "Luxury Apartment",
    location: "Dubai, UAE",
    value: "$500,000",
    status: "Pending"
  },
  {
    id: 2,
    user: "Jane Smith",
    email: "janesmith@example.com",
    phone: "987-654-3210",
    property: "Beach Villa",
    location: "Abu Dhabi, UAE",
    value: "$750,000",
    status: "Pending"
  },
  {
    id: 3,
    user: "Michael Johnson",
    email: "michaelj@example.com",
    phone: "456-789-0123",
    property: "Skyline Penthouse",
    location: "New York, USA",
    value: "$2,000,000",
    status: "Pending"
  }
];

const PropertyDetails = () => {
  const { id } = useParams();
  const property = propertyRequests.find((req) => req.id === parseInt(id));

  if (!property) {
    return <div className="p-6 text-red-500">Property not found!</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Property Details</h2>
      <div className="bg-white p-6 rounded shadow-md">
        <p><strong>Property Name:</strong> {property.property}</p>
        <p><strong>Location:</strong> {property.location}</p>
        <p><strong>Value:</strong> {property.value}</p>
        <p><strong>Status:</strong> {property.status}</p>
        <h3 className="text-xl font-bold mt-4">Seller Information</h3>
        <p><strong>Name:</strong> {property.user}</p>
        <p><strong>Email:</strong> {property.email}</p>
        <p><strong>Phone:</strong> {property.phone}</p>
      </div>
    </div>
  );
};

export default PropertyDetails;
