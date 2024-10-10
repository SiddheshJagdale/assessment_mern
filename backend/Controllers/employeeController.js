// controllers/employeeController.js

import { Employee } from "../Models/employeeSchema.js"; // Adjust the import path as necessary

// Controller to create a new employee
export const createEmployee = async (req, res) => {
  const {
    f_Name,
    f_Email,
    f_Mobile,
    f_Designation,
    f_Gender,
    f_Course,
    f_Image,
  } = req.body;

  console.log(f_Name + "hello");
  console.log(f_Email + "hello");
  console.log(f_Course + "hello");

  try {
    // Create a new employee instance
    const newEmployee = new Employee({
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_Gender,
      f_Course,
      f_Image,
    });

    // Save the employee to the database
    await newEmployee.save();

    res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getEmployees = async (req, res) => {
  try {
    // Fetch all employees from the database
    const employees = await Employee.find();

    // Respond with the list of employees
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params; // Get the employee ID from the request parameters

  try {
    // Find and delete the employee by ID
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    // Check if the employee was found and deleted
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee deleted successfully",
      employee: deletedEmployee,
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to edit an existing employee
export const editEmployee = async (req, res) => {
  const { id } = req.params; // Get the employee ID from the request parameters
  const {
    f_Name,
    f_Email,
    f_Mobile,
    f_Designation,
    f_Gender,
    f_Course,
    f_Image,
  } = req.body; // Extract updated employee data from the request body

  try {
    // Update the employee in the database
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        f_Name,
        f_Email,
        f_Mobile,
        f_Designation,
        f_Gender,
        f_Course,
        f_Image,
      },
      { new: true } // Return the updated document
    );

    // If no employee found, return a 404 error
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
