import React, { useEffect, useState } from "react";
import SellingRequestCard from "../components/SellingRequestCard";


const API_URL = "https://localhost:7183/api/PropertyOffer/pending";

const SellingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch requests.");
        }
        const data = await response.json();
        
        // Log requests to verify IDs exist
        console.log("Fetched Requests:", data);
        
        setRequests(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchRequests();
  }, []);
  
  if (loading)
    return <p className="text-center text-gray-600 mt-8">Loading requests...</p>;
  if (requests.length === 0)
    return <p className="text-center text-gray-600 mt-8">No selling requests found.</p>;

  if (error) {
    return <div className="text-center text-red-500 text-lg">{error}</div>;
  }
  const handleDeleteRequest = (offerID) => {
    setRequests((prev) => prev.filter((r) => r.offerID !== offerID));
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-700">
        Selling Requests
      </h2>
      <div className="flex flex-col gap-8">
        {requests.map((request , index) => (
          <SellingRequestCard key={request.offerID} request={request} onDelete={handleDeleteRequest} />
        ))}
      </div>
    </div>
  );
};

export default SellingRequests;