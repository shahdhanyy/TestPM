import React, { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import { FaSearch } from "react-icons/fa"; // Import search icon

const API_URL = "https://localhost:7183/api/Property";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch properties.");
        }
        const data = await response.json();
        
        // Log properties to verify IDs exist
        console.log("Fetched properties:", data);
        
        setProperties(data);
        setFilteredProperties(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProperties();
  }, []);
  

  // Function to handle search dynamically
  useEffect(() => {
    if (!searchTerm) {
      setFilteredProperties(properties);
      return;
    }

    const filtered = properties.filter((property) =>
      Object.values(property).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    setFilteredProperties(filtered);
  }, [searchTerm, properties]);

  if (loading) {
    return <div className="text-center text-lg text-gray-500">Loading properties...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-lg">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6 ">
      {/* Search Bar with Icon */}
      <div className="mb-6 flex justify-center">
        <div className="relative w-full md:w-1/2">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6A9C89]" />
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border rounded-full shadow-lg focus:ring-2 focus:ring-[#6A9C89] focus:outline-none transition"
          />
        </div>
      </div>

      {/* Property Cards */}
      {filteredProperties.length === 0 ? (
        <p className="text-center font-bold text-[#6A9C89]">No properties match your search criteria.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{filteredProperties.map((property, index) => (
  <PropertyCard key={property.id } property={property} />
))}

        </div>
      )}
    </div>
  );
};

export default PropertyList;
