import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "Reducer/Store";
import {  HiOutlineShoppingCart } from "react-icons/hi2";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; profileImage?: string } | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);

  const isAdmin = localStorage.getItem("role") === "admin";
  //cart items
  const productItems=useSelector((state:RootState)=>state.cart.items)
  console.log(productItems)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.name && parsedUser.email) {
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdown(false);
      }
    };
    if (profileDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileDropdown]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdown(!profileDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
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
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-black cursor-pointer">
              #CROCHETSHOP
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="items-center hidden ml-auto space-x-4 sm:flex">
            <Link to="/about" style={location.pathname === "/about" ? activeStyles : undefined} className="px-3 py-2 font-bold text-black rounded-md hover:bg-gray-200">
              ABOUT
            </Link>
            {isAdmin && (
              <Link to="/admin" style={location.pathname === "/admin" ? activeStyles : undefined} className="px-3 py-2 font-bold text-black rounded-md hover:bg-gray-200">
                DASHBOARD
              </Link>
            )}
            <Link to="/products" style={location.pathname === "/products" ? activeStyles : undefined} className="px-3 py-2 font-bold text-black rounded-md hover:bg-gray-200">
              PRODUCTS
            </Link>
            {/*cart*/}
            <Link
            to="/cart"
            className="flex items-center p-1 px-2 rounded-sm sm:px-6"
            >
              <HiOutlineShoppingCart className="w-8 h-10 text-gray-600 hover:bg-orange-400" />
             
              {productItems.length > 0 ? 
                <span className="text-sm font-semibold sm:ml-1 hover:bg-orange-400">{productItems.length}</span>:
                <span className="text-sm font-semibold sm:ml-1 hover:bg-orange-400">0</span>
              }
            </Link>
            {/* Profile Dropdown (Desktop) */}
            <div className="relative" ref={profileRef}>
              <button onClick={toggleProfileDropdown} className="flex items-center focus:outline-none">
                {user?.profileImage ? (
                  <img src={user.profileImage} alt="Profile" className="w-8 h-8 rounded-full" />
                ) : (
                  <FaUserCircle className="w-8 h-8 text-gray-600" />
                )}
              </button>

              {profileDropdown && (
                <div className="absolute right-0 z-10 w-48 mt-2 bg-white border rounded-lg shadow-lg">
                  <div className="px-4 py-2 text-sm text-gray-700">
                   
                  </div>
                  <hr />
                  <Link to="/profile" className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-200" onClick={() => setProfileDropdown(false)}>
                    <FaUserCircle className="w-4 h-4 mr-2"/>Profile
                  </Link>
                  <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-200">
                    <FaSignOutAlt className="w-4 h-4 mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button type="button" className="p-2 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none" onClick={toggleMenu}>
              {isOpen ? (
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} sm:hidden bg-white shadow-md`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link to="/about" style={location.pathname === "/about" ? activeStyles : undefined} className="block px-3 py-2 font-bold text-black rounded-md hover:bg-gray-200">
            ABOUT
          </Link>
          {isAdmin && (
            <Link to="/admin" style={location.pathname === "/admin" ? activeStyles : undefined} className="block px-3 py-2 font-bold text-black rounded-md hover:bg-gray-200">
              DASHBOARD
            </Link>
          )}
          <Link to="/products" style={location.pathname === "/products" ? activeStyles : undefined} className="block px-3 py-2 font-bold text-black rounded-md hover:bg-gray-200">
            PRODUCTS
          </Link>
          
          {/*cart*/}
          <Link
            to="/cart"
            className="flex items-center p-1 px-2 rounded-sm sm:px-6"
            >
              <HiOutlineShoppingCart className="w-6 h-6 text-gray-600" />
              {productItems.length > 0 ? 
                <span className="text-sm font-semibold sm:ml-1 hover:bg-orange-400">{productItems.length}</span>:
                <span className="text-sm font-semibold sm:ml-1">0</span>
              }
            </Link>
          {/* Profile Dropdown (Mobile) */}
          <div className="mt-4 border-t">
            <div className="flex items-center px-3 py-2 space-x-3">
              {user?.profileImage ? (
                <img src={user.profileImage} alt="Profile" className="w-10 h-10 rounded-full" />
              ) : (
                <FaUserCircle className="w-10 h-10 text-gray-600" />
              )}
              
            </div>
            <Link to="/profile" className="block px-3 py-2 text-black hover:bg-gray-200">Profile</Link>
            <button onClick={handleLogout} className="block w-full px-3 py-2 text-left text-black hover:bg-gray-200">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
