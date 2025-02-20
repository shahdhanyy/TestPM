import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPropertyForm = () => {
  const { id } = useParams(); // Get property ID from URL
  const navigate = useNavigate();

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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Property ID from URL:", id);

    const fetchProperty = async () => {
      try {
        const response = await fetch(`https://localhost:7183/api/Property/${id}`);
        if (!response.ok) throw new Error("Failed to fetch property data");

        const data = await response.json();
        console.log("Fetched Property Data:", data);

        setProperty({
          imageUrl: data.imageUrl || "",
          imageFile: null,
          propertyName: data.propertyName || "",
          propertyType: data.propertyType || "",
          numOfRooms: data.numOfRooms || "",
          numOfBathrooms: data.numOfBathrooms || "",
          propertyArea: data.propertyArea || "",
          floorNumber: data.floorNumber || "",
          propertyOverview: data.propertyOverview || "",
          propertyAddress: {
            street: data.propertyAddress?.street || "",
            city: data.propertyAddress?.city || "",
            state: data.propertyAddress?.state || "",
            country: data.propertyAddress?.country || "",
          },
          propertyLongitude: data.propertyLongitude || "",
          propertyLatitude: data.propertyLatitude || "",
          propertyPrice: data.propertyPrice || "",
          serviceFees: data.serviceFees || "",
          managementFees: data.managementFees || "",
          maintenanceFees: data.maintenanceFees || "",
          operatingExpenses: data.operatingExpenses || "",
          appreciationRate: data.appreciationRate || "",
          currentRent: data.currentRent || "",
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching property data:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    } else {
      console.error("Invalid property ID");
      setLoading(false);
    }
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("propertyAddress.")) {
      const addressField = name.split(".")[1];
      setProperty((prev) => ({
        ...prev,
        propertyAddress: { ...prev.propertyAddress, [addressField]: value },
      }));
    } else {
      setProperty((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProperty((prev) => ({ ...prev, imageFile: file }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting updated property data:", property);

    const formData = new FormData();
    formData.append("imageFile", property.imageFile);
    formData.append("propertyName", property.propertyName);
    formData.append("propertyType", property.propertyType);
    formData.append("numOfRooms", property.numOfRooms);
    formData.append("numOfBathrooms", property.numOfBathrooms);
    formData.append("propertyArea", property.propertyArea);
    formData.append("floorNumber", property.floorNumber);
    formData.append("propertyOverview", property.propertyOverview);
    formData.append("street", property.propertyAddress.street);
    formData.append("city", property.propertyAddress.city);
    formData.append("state", property.propertyAddress.state);
    formData.append("country", property.propertyAddress.country);
    formData.append("propertyLongitude", property.propertyLongitude);
    formData.append("propertyLatitude", property.propertyLatitude);
    formData.append("propertyPrice", property.propertyPrice);
    formData.append("serviceFees", property.serviceFees);
    formData.append("managementFees", property.managementFees);
    formData.append("maintenanceFees", property.maintenanceFees);
    formData.append("operatingExpenses", property.operatingExpenses);
    formData.append("appreciationRate", property.appreciationRate);
    formData.append("currentRent", property.currentRent);

    try {
      const response = await fetch(`https://localhost:7183/api/Property/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        console.log("Property updated successfully!");
        navigate("/properties");
      } else {
        throw new Error("Failed to update property");
      }
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading property data...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Property</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image Upload */}
        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded" />
        
        {/* Property Details */}
        <input type="text" name="propertyName" value={property.propertyName} onChange={handleChange} placeholder="Property Name" className="w-full p-2 border rounded" required />

        <input type="text" name="propertyType" value={property.propertyType} onChange={handleChange} placeholder="Property Type" className="w-full p-2 border rounded" required />

        <input type="number" name="numOfRooms" value={property.numOfRooms} onChange={handleChange} placeholder="Rooms" className="w-full p-2 border rounded" required />

        <input type="number" name="numOfBathrooms" value={property.numOfBathrooms} onChange={handleChange} placeholder="Bathrooms" className="w-full p-2 border rounded" required />

        <input type="number" name="propertyArea" value={property.propertyArea} onChange={handleChange} placeholder="Area" className="w-full p-2 border rounded" required />

        <input type="number" name="floorNumber" value={property.floorNumber} onChange={handleChange} placeholder="Floor Number" className="w-full p-2 border rounded" required />

        <textarea name="propertyOverview" value={property.propertyOverview} onChange={handleChange} placeholder="Overview" className="w-full p-2 border rounded"></textarea>

        {/* Financial Details */}
        <input type="number" name="propertyPrice" value={property.propertyPrice} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" required />

        <input type="number" name="serviceFees" value={property.serviceFees} onChange={handleChange} placeholder="Service Fees" className="w-full p-2 border rounded" />

        <input type="number" name="managementFees" value={property.managementFees} onChange={handleChange} placeholder="Management Fees" className="w-full p-2 border rounded" />

        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
          Update Property
        </button>
      </form>
    </div>
  );
};

export default EditPropertyForm;
