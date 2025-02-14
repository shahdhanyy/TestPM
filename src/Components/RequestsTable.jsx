import React from "react";
import { useNavigate } from "react-router-dom";

const requests = [
  { id: 1, user: "John Doe", property: "Luxury Apartment", status: "Pending" },
  { id: 2, user: "Jane Smith", property: "Beach Villa", status: "Pending" },
  { id: 3, user: "Michael Johnson", property: "Skyline Penthouse", status: "Pending" },
];

const RequestsTable = () => {
  const navigate = useNavigate();

  return (
    <table className="min-w-full bg-white border border-gray-300 shadow-md">
      <thead>
        <tr className="bg-gray-200">
          <th className="border px-4 py-2">User</th>
          <th className="border px-4 py-2">Property</th>
          <th className="border px-4 py-2">Status</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((request) => (
          <tr key={request.id} className="hover:bg-gray-100">
            <td className="border px-4 py-2">{request.user}</td>
            <td className="border px-4 py-2">{request.property}</td>
            <td className="border px-4 py-2">{request.status}</td>
            <td className="border px-4 py-2 flex gap-2">
              <button className="bg-green-500 text-white px-4 py-2 rounded">
                Approve
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded">
                Decline
              </button>
              <button
                onClick={() => navigate(`/property-details/${request.id}`)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Property Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RequestsTable;
