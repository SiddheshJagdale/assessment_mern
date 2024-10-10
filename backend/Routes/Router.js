// routes/userRoutes.js

import express from "express";
import { loginUser, registerUser } from "../Controllers/userController.js"; // Adjust the import path as necessary
import {
  createEmployee,
  getEmployees,
  deleteEmployee,
  editEmployee,
} from "../Controllers/employeeController.js"; // Import the employee controller

const router = express.Router();

// Route for user login
router.post("/login", loginUser);

// Route for user registration
router.post("/register", registerUser);

// Route for creating a new employee
router.post("/createEmployee", createEmployee);
router.get("/getEmployees", getEmployees);
router.delete("/deleteEmployee/:id", deleteEmployee); // Route to delete employee
router.put("/editEmployee/:id", editEmployee); // Route to delete employee

export default router;
