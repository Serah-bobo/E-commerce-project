import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the user is an admin
  const isAdmin = localStorage.getItem("role") === "admin";
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    navigate("/login"); // Redirect to logout page
  };

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#000000",
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logout Button (Far Left) */}
          <button
            onClick={handleLogout}
            className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-200"
          >
            <FaSignOutAlt className="w-5 h-5 mr-2" />
          </button>

          {/* Centered Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-black cursor-pointer">
              #CROCHETSHOP
            </Link>
          </div>

          {/* Desktop Menu (Right Side) */}
          <div className="items-center hidden ml-auto space-x-4 sm:flex">
            <Link
              to="/about"
              style={location.pathname === "/about" ? activeStyles : undefined}
              className="px-3 py-2 font-bold text-black rounded-md cursor-pointer text-md hover:bg-gray-200"
            >
              ABOUT
            </Link>
            {/* Admin Dashboard Link */}
            {isAdmin && (
              <Link
                to="/admin"
                style={location.pathname === "/admin" ? activeStyles : undefined}
                className="px-3 py-2 font-bold text-black rounded-md cursor-pointer text-md hover:bg-gray-200"
              >
                DASHBOARD
              </Link>
            )}
          </div>
          
          
          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} sm:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/about"
            style={location.pathname === "/about" ? activeStyles : undefined}
            className="block px-3 py-2 text-base font-bold text-black rounded-md cursor-pointer hover:bg-gray-200"
          >
            ABOUT
          </Link>
                
                 {/* Admin Dashboard Link for Mobile Menu */}
          {isAdmin && (
            <Link
              to="/admin"
              style={location.pathname === "/admin" ? activeStyles : undefined}
              className="block px-3 py-2 text-base font-bold text-black rounded-md cursor-pointer hover:bg-gray-200"
            >
              Dashboard
            </Link>
          )}
         
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
