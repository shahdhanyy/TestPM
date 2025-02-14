import React from "react";
import RequestsTable from "../Components/RequestsTable";

const ViewRequests = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Investment Selling Requests</h2>
      <RequestsTable />
    </div>
  );
};

export default ViewRequests;
