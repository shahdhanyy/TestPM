// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { FaBars } from "react-icons/fa";

const CustomNavbar = () => {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navList = (
    <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography as="li" variant="small" className="p-1 font-normal">
        <Link to="/" className="flex items-center hover:text-blue-500 text-blue-900 font-medium">
           Property Listings
        </Link>
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-normal">
        <Link to="/add-property" className="flex items-center hover:text-blue-500 text-blue-900 font-medium">
           Add Property
        </Link>
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-normal">
        <Link to="/selling-requests" className="flex items-center hover:text-blue-500 text-blue-900 font-medium">
           Selling Requests
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="fixed top-0 left-0 w-full z-50 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 shadow-md bg-white">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as={Link}
          to="/"
          className="mr-4 cursor-pointer py-1.5 font-medium text-xl text-blue-900"
        >
          Property Manager
        </Typography>
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">{navList}</div>
          <IconButton
            variant="text"
            className={`ml-auto h-10 w-10 text-white bg-blue-900 rounded-full p-2 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800 lg:hidden`}
            onClick={() => setOpenNav(!openNav)}
          >

            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <FaBars size={20} />
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav open={openNav}>{navList}</MobileNav>
    </Navbar>
  );
};

export default CustomNavbar;
