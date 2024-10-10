// models/employeeSchema.js

import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  f_Image: {
    type: String, // Assuming this is a URL or path to an image
    required: false, // Make this optional if an image isn't required
  },
  f_Name: {
    type: String,
    required: true,
  },
  f_Email: {
    type: String,
    required: true,
    unique: true, // Ensure that the email is unique
    match: /.+\@.+\..+/, // Basic email validation regex
  },
  f_Mobile: {
    type: String,
    required: true,
    match: /^\d{10}$/, // Basic validation for 10-digit mobile numbers
  },
  f_Designation: {
    type: String,
    required: true,
  },
  f_Gender: {
    type: String,
    enum: ["Male", "Female", "Other"], // Restrict to these values
    required: true,
  },
  f_Course: {
    type: [String], // Changed to array to support multiple courses
    required: false, // Optional if not required
  },
  f_Createdate: {
    type: Date,
    default: Date.now, // Automatically set the creation date to now
  },
});

// Export the Employee model
export const Employee = mongoose.model("Employee", employeeSchema);
