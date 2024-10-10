// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; // Import the logout icon from react-icons

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user ? user.username : null; // Retrieve username from local storage

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove username from local storage
    navigate("/login"); // Redirect to the login page
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          {!username ? ( // Show these links only if there is no current user
            <>
              <Link
                to="/login"
                className="text-white text-lg font-semibold hover:text-gray-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white text-lg font-semibold hover:text-gray-300"
              >
                Register
              </Link>
            </>
          ) : (
            // If there's a current user, show the username and logout button
            <div className="flex items-center space-x-2">
              <span className="text-white text-lg font-semibold">
                {username}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center text-white text-lg font-semibold hover:text-gray-300"
              >
                <FiLogOut className="mr-1" /> {/* Add the logout icon */}
                Logout
              </button>
            </div>
          )}
        </div>
        <div className="flex space-x-4">
          <Link
            to="/create-employee"
            className="text-white text-lg font-semibold hover:text-gray-300"
          >
            Create Employee
          </Link>
          <Link
            to="/employee-list"
            className="text-white text-lg font-semibold hover:text-gray-300"
          >
            Employee List
          </Link>
          <Link
            to="/dashboard"
            className="text-white text-lg font-semibold hover:text-gray-300"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
