// src/components/EditEmployeeDialog.js
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { toast } from "react-hot-toast"; // Import React Hot Toast
import { editEmployeeRoute } from "../utils/apiRoutes.js";

const EditEmployeeDialog = ({ employee, onClose }) => {
  const [name, setName] = useState(employee.f_Name);
  const [email, setEmail] = useState(employee.f_Email);
  const [mobile, setMobile] = useState(employee.f_Mobile);
  const [designation, setDesignation] = useState(employee.f_Designation);
  const [gender, setGender] = useState(employee.f_Gender);
  const [courses, setCourses] = useState(employee.f_Course || []);

  const handleCourseChange = (e) => {
    const { value } = e.target;
    if (courses.includes(value)) {
      setCourses(courses.filter((course) => course !== value));
    } else {
      setCourses([...courses, value]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const updatedEmployee = {
      f_Name: name,
      f_Email: email,
      f_Mobile: mobile,
      f_Designation: designation,
      f_Gender: gender,
      f_Course: courses,
    };

    try {
      const url = editEmployeeRoute(employee._id);

      await axios.put(url, updatedEmployee); // Adjust the endpoint as necessary
      toast.success("Employee updated successfully!");
      onClose(); // Close the dialog
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Failed to update employee. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">Edit Employee</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Designation
            </label>
            <input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              required
            />
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
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeDialog;
