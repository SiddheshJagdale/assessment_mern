// src/components/CreateEmployee.js
import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import { createEmployeeRoute } from "../utils/apiRoutes.js"; // Adjust the import path as necessary
import { toast } from "react-hot-toast"; // Import React Hot Toast

const CreateEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [courses, setCourses] = useState([]);
  const [image, setImage] = useState(""); // Store image as base64 string

  // Handle course checkbox change
  const handleCourseChange = (e) => {
    const { value } = e.target;
    if (courses.includes(value)) {
      setCourses(courses.filter((course) => course !== value));
    } else {
      setCourses([...courses, value]);
    }
  };

  // Convert image file to base64 string
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set base64 string
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Client-side validation
    if (
      [
        name,
        email,
        mobile,
        designation,
        gender,
        courses.length,
        !image, // Check if image is selected
      ].includes("") ||
      courses.length === 0
    ) {
      return toast.error("All fields are required.");
    }

    if (!/^\d{10}$/.test(mobile)) {
      return toast.error("Mobile number must be 10 digits.");
    }

    // Create payload
    const payload = {
      f_Name: name,
      f_Email: email,
      f_Mobile: mobile,
      f_Designation: designation,
      f_Gender: gender,
      f_Course: JSON.stringify(courses), // Send as string if multiple courses
      f_Image: image, // Send base64 string
    };

    try {
      const response = await axios.post(createEmployeeRoute, payload, {
        headers: { "Content-Type": "application/json" }, // Set content type to JSON
      });

      if (response.status === 201) {
        toast.success("Employee created successfully!");
        // Reset form fields
        setName("");
        setEmail("");
        setMobile("");
        setDesignation("");
        setGender("");
        setCourses([]);
        setImage(""); // Reset image to an empty string
      }
    } catch (error) {
      console.error("Error creating employee:", error);
      toast.error("Failed to create employee. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Employee
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile
            </label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Designation
            </label>
            <select
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <div className="flex items-center mt-2">
              <label className="mr-4">
                <input
                  type="radio"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                  className="mr-1"
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                  className="mr-1"
                />
                Female
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Courses
            </label>
            <div className="flex flex-col mt-2">
              <label>
                <input
                  type="checkbox"
                  value="MCA"
                  checked={courses.includes("MCA")}
                  onChange={handleCourseChange}
                  className="mr-1"
                />
                MCA
              </label>
              <label>
                <input
                  type="checkbox"
                  value="BSC"
                  checked={courses.includes("BSC")}
                  onChange={handleCourseChange}
                  className="mr-1"
                />
                BSC
              </label>
              <label>
                <input
                  type="checkbox"
                  value="BCA"
                  checked={courses.includes("BCA")}
                  onChange={handleCourseChange}
                  className="mr-1"
                />
                BCA
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit" // Changed to "submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;
