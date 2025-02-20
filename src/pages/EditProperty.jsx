import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProperty = () => {
  const { id } = useParams();
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
    const fetchProperty = async () => {
      try {
        const response = await fetch(
          `https://localhost:7183/api/Property/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch property data");

        const data = await response.json();
        setProperty({
          ...data,
          imageFile: null,
          propertyAddress: {
            street: data.propertyAddress?.street || "",
            city: data.propertyAddress?.city || "",
            state: data.propertyAddress?.state || "",
            country: data.propertyAddress?.country || "",
          },
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching property data:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  // Handle text field changes
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

  // Handle image file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProperty((prev) => ({ ...prev, imageFile: file }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (property.imageFile) formData.append("imageFile", property.imageFile);

    Object.keys(property).forEach((key) => {
      if (key === "propertyAddress") {
        Object.keys(property.propertyAddress).forEach((addrKey) => {
          formData.append(
            `propertyAddress.${addrKey}`,
            property.propertyAddress[addrKey]
          );
        });
      } else {
        formData.append(key, property[key]);
      }
    });

    try {
      const response = await fetch(
        `https://localhost:7183/api/Property/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        navigate("/");
      } else {
        throw new Error("Failed to update property");
      }
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  if (loading)
    return (
      <p className="text-center text-[#6A9C89]">Loading property data...</p>
    );

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-600">
        Edit Property
      </h2>

      {/* Existing Image Preview */}
      {property.imageUrl && (
        <div className="flex justify-center mb-6">
          <img
            src={property.imageUrl}
            alt="Property"
            className="w-48 h-32 object-cover rounded-md shadow"
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Property Data */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
            Basic Property Data
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-[#6A9C89] font-semibold">
                Upload New Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border rounded"
              />
            </div>

            {[
              ["Property Name", "propertyName"],
              ["Property Type", "propertyType"],
              ["Number of Rooms", "numOfRooms"],
              ["Number of Bathrooms", "numOfBathrooms"],
              ["Property Area (sq ft)", "propertyArea"],
              ["Floor Number", "floorNumber"],
            ].map(([label, name]) => (
              <div key={name}>
                <label className="block text-[#6A9C89] font-semibold">
                  {label}
                </label>
                <input
                  type="text"
                  name={name}
                  value={property[name]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            ))}

            <div className="col-span-2">
              <label className="block text-[#6A9C89] font-semibold">
                Property Overview
              </label>
              <textarea
                name="propertyOverview"
                value={property.propertyOverview}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              ></textarea>
            </div>
          </div>
        </section>

        {/* Address & Location Details */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
            Address & Location Details
          </h3>
          <div className="grid grid-cols-2 gap-6">
            {[
              ["Street", "propertyAddress.street"],
              ["City", "propertyAddress.city"],
              ["State", "propertyAddress.state"],
              ["Country", "propertyAddress.country"],
              ["Longitude", "propertyLongitude"],
              ["Latitude", "propertyLatitude"],
            ].map(([label, name]) => (
              <div key={name}>
                <label className="block text-[#6A9C89] font-semibold">
                  {label}
                </label>
                <input
                  type="text"
                  name={name}
                  value={
                    name.includes("propertyAddress")
                      ? property.propertyAddress[name.split(".")[1]]
                      : property[name]
                  }
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            ))}
          </div>
        </section>

        {/* Financial Data */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
            Financial Data
          </h3>
          <div className="grid grid-cols-2 gap-6">
            {[
              ["Property Price", "propertyPrice"],
              ["Service Fees", "serviceFees"],
              ["Management Fees", "managementFees"],
              ["Maintenance Fees", "maintenanceFees"],
              ["Operating Expenses", "operatingExpenses"],
              ["Appreciation Rate (%)", "appreciationRate"],
              ["Current Rent", "currentRent"],
            ].map(([label, name]) => (
              <div key={name}>
                <label className="block text-[#6A9C89] font-semibold">
                  {label}
                </label>
                <input
                  type="number"
                  name={name}
                  value={property[name]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            ))}
          </div>
        </section>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-[#0E8388] to-[#3d3d3d] text-white py-2 rounded-lg transition-all duration-300 hover:opacity-80 hover:shadow-lg"
          >
            Update Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProperty;
