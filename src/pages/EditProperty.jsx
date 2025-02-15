import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditPropertyForm from "../components/EditPropertyForm";

const API_URL = "https://localhost:7183/api/Property"; // Your backend API

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch property details.");
        }
        let data = await response.json();
        
        // Ensure all non-string attributes are correctly set
        data = {
          propertyName: data.propertyName || "",
          propertyType: data.propertyType || "",
          propertyAddress: data.propertyAddress || "",
          propertyPrice: data.propertyPrice ?? 0,
          fundingStatus: data.fundingStatus || "",
          rentingStatus: data.rentingStatus || "",
          fundingPercentage: data.fundingPercentage ?? 0,
          numOfRooms: data.numOfRooms ?? 0,
          numOfBathrooms: data.numOfBathrooms ?? 0,
          propertyArea: data.propertyArea ?? 0,
          floorNumber: data.floorNumber ?? 0,
          imageUrl: data.imageUrl || "",
          propertyOverview: data.propertyOverview || "",
          propertyLongitude: data.propertyLongitude ?? 0,
          propertyLatitude: data.propertyLatitude ?? 0,
          currentRent: data.currentRent ?? 0,
          serviceFees: data.serviceFees ?? 0,
          managementFees: data.managementFees ?? 0,
          maintenanceFees: data.maintenanceFees ?? 0,
          appreciationRate: data.appreciationRate ?? 0,
          fundingDate: data.fundingDate || "",
          sellingStatus: data.sellingStatus || "",
          numberOfInvestors: data.numberOfInvestors ?? 0,
          availablePrice: data.availablePrice ?? 0,
        };
        
        setProperty(data);
      } catch (error) {
        console.error("Error fetching property:", error);
        setError("Unable to load property details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  const updateProperty = async (updatedProperty) => {
    setSaving(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProperty),
      });

      if (!response.ok) {
        throw new Error("Failed to update property.");
      }

      alert("Property updated successfully!");
      navigate("/"); // Redirect to home page after saving
    } catch (error) {
      console.error("Error updating property:", error);
      alert("Error updating property. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center text-lg">Loading property details...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Property</h2>
      {property && (
        <EditPropertyForm propertyToEdit={property} updateProperty={updateProperty} saving={saving} />
      )}
    </div>
  );
};

export default EditProperty;
