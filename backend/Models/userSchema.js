// models/userSchema.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  f_name: {
    type: String,
    required: true,
  },
  f_userName: {
    type: String,
    required: true,
    unique: true, // Ensure that the username is unique
  },
  f_Pwd: {
    type: String,
    required: true,
  },
  f_sno: {
    type: Number,
    default: Date.now, // You can adjust this as per your needs
  },
});

export const Login = mongoose.model("User", userSchema);
