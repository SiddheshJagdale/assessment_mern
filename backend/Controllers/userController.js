// controllers/userController.js

import { Login } from "../Models/userSchema.js"; // Adjust the import path as necessary
import bcrypt from "bcrypt"; // Optional: if you're hashing passwords

// Function to check login details
export const loginUser = async (req, res) => {
  const { f_userName, f_Pwd } = req.body;

  try {
    // Find user by username
    const user = await Login.findOne({ f_userName });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password matches
    // const isMatch = await bcrypt.compare(f_Pwd, user.f_Pwd); // Use bcrypt to compare hashed passwords

    if (!f_Pwd === user.f_Pwd) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Successful login
    res.status(200).json({
      message: "Login successful",
      user: { f_userName: user.f_userName, f_sno: user.f_sno },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const registerUser = async (req, res) => {
  const { f_name, f_userName, f_Pwd } = req.body;

  console.log(f_name);

  try {
    // Check if the username already exists
    const existingUser = await Login.findOne({ f_userName });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(f_Pwd, 10); // Hash with a cost factor of 10

    // Create a new user instance
    const newUser = new Login({
      f_name,
      f_userName,
      f_Pwd: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
