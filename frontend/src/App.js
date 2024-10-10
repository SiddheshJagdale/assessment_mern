import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register"; // Adjust import paths accordingly
import Login from "./components/Login"; // Adjust import paths accordingly
import Dashboard from "./components/Dashboard"; // Adjust import paths accordingly
import Navbar from "./components/Navbar";
import CreateEmployee from "./components/CreateEmployee";
import EmployeeList from "./components/EmployeeList.jsx";

const App = () => {
  return (
    <Router>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-employee" element={<CreateEmployee />} />
        <Route path="/employee-list" element={<EmployeeList />} />{" "}
      </Routes>
    </Router>
  );
};

export default App;
