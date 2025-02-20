import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaHome, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { MdRequestPage } from "react-icons/md";

const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`h-screen flex flex-col ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 shadow-xl
        bg-gradient-to-b from-[#3D3D3D] to-[#2C2C2C] text-white
      `}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-600">
        <h1
          className={`text-xl font-semibold text-[#FFFAEC] transition-all duration-300 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          Property Manager
        </h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white p-2 hover:bg-[#474747] rounded-lg transition duration-200"
        >
          <FaBars size={22} />
        </button>
      </div>

      {/* Sidebar Links */}
      <nav className="flex flex-col flex-grow px-2 pt-4 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-3 p-3 rounded-md transition-all duration-200 
            hover:bg-[#474747] hover:scale-[1.02] hover:shadow-sm"
        >
          <FaHome size={22} className="text-[#6A9C89]" />
          <span
            className={`${isOpen ? "block" : "hidden"} text-[#FFFAEC] font-medium`}
          >
            Property Listings
          </span>
        </Link>

        <Link
          to="/add-property"
          className="flex items-center gap-3 p-3 rounded-md transition-all duration-200 
            hover:bg-[#474747] hover:scale-[1.02] hover:shadow-sm"
        >
          <FaPlus size={22} className="text-[#6A9C89]" />
          <span
            className={`${isOpen ? "block" : "hidden"} text-[#FFFAEC] font-medium`}
          >
            Add Property
          </span>
        </Link>

        <Link
          to="/selling-requests"
          className="flex items-center gap-3 p-3 rounded-md transition-all duration-200 
            hover:bg-[#474747] hover:scale-[1.02] hover:shadow-sm"
        >
          <MdRequestPage size={22} className="text-[#6A9C89]" />
          <span
            className={`${isOpen ? "block" : "hidden"} text-[#FFFAEC] font-medium`}
          >
            Selling Requests
          </span>
        </Link>
      </nav>

      {/* Logout Button */}
      <div className="p-4 mt-auto">
        <button
          className="flex items-center w-full gap-3 p-3 rounded-md transition-all duration-300 
            shadow-md bg-[#6A9C89] hover:bg-[#5C8C78] text-white"
        >
          <FaSignOutAlt size={22} />
          <span className={`${isOpen ? "block" : "hidden"}`}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidenav;
