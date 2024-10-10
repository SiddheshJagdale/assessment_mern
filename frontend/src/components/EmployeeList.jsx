// src/components/EmployeeList.js
import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import { toast } from "react-hot-toast"; // Import React Hot Toast
import EditEmployeeDialog from "./EditEmployeeDialog.jsx"; // Import the EditEmployeeDialog component
import { getEmployeesRoute, deleteEmployeeRoute } from "../utils/apiRoutes.js";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10); // Number of employees to show per page
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  // Fetch employees from the backend
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(getEmployeesRoute); // Adjust the endpoint as necessary
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Failed to fetch employees. Please try again.");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle delete employee
  const handleDelete = async (employeeId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const url = deleteEmployeeRoute(employeeId);
        await axios.delete(url); // Adjust the endpoint as necessary
        setEmployees(
          employees.filter((employee) => employee._id !== employeeId)
        );
        toast.success("Employee deleted successfully!");
      } catch (error) {
        console.error("Error deleting employee:", error);
        toast.error("Failed to delete employee. Please try again.");
      }
    }
  };

  // Open edit dialog
  const openEditDialog = (employee) => {
    setEditingEmployee(employee);
    setIsEditing(true);
  };

  // Close edit dialog
  const closeEditDialog = () => {
    setEditingEmployee(null);
    setIsEditing(false);
    fetchEmployees(); // Refresh employee list after editing
  };

  // Sorting employees
  const sortedEmployees = React.useMemo(() => {
    let sortableEmployees = [...employees];

    if (sortConfig.key) {
      sortableEmployees.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableEmployees;
  }, [employees, sortConfig]);

  // Handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filtering employees by search term
  const filteredEmployees = sortedEmployees.filter((employee) =>
    Object.values(employee).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination logic
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Employee List</h1>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        />

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th
                onClick={() => handleSort("f_Name")}
                className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                onClick={() => handleSort("f_Email")}
                className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                onClick={() => handleSort("f_Mobile")}
                className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Mobile
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Designation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Courses
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentEmployees.map((employee) => (
              <tr key={employee._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {employee.f_Image && (
                    <img
                      src={employee.f_Image}
                      alt={employee.f_Name}
                      className="h-10 w-10 rounded-full"
                    />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {employee.f_Name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {employee.f_Email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {employee.f_Mobile}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {employee.f_Designation}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {employee.f_Gender}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {employee.f_Course.join(", ")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(employee.f_Createdate).toLocaleDateString()}{" "}
                  {/* Show formatted date */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => openEditDialog(employee)}
                    className="mr-2 text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(employee._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>

      {/* Edit Employee Dialog */}
      {isEditing && (
        <EditEmployeeDialog
          employee={editingEmployee}
          onClose={closeEditDialog}
        />
      )}
    </div>
  );
};

export default EmployeeList;
