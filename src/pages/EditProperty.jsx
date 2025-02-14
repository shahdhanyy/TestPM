import React from "react";
import { useParams } from "react-router-dom";
import EditPropertyForm from "../components/EditPropertyForm";

const EditProperty = ({ properties, updateProperty }) => {
  const { id } = useParams();
  const propertyToEdit = properties.find((prop) => prop.id === parseInt(id));

  if (!propertyToEdit) {
    return <div className="p-6 text-red-500">Property not found!</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Property</h2>
      <EditPropertyForm propertyToEdit={propertyToEdit} updateProperty={updateProperty} />
    </div>
  );
};

export default EditProperty;
