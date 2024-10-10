import React from "react";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Dashboard
        </h1>
        <p className="text-lg text-center text-gray-600">
          Welcome to the Dashboard! Manage your settings and access important
          information.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
