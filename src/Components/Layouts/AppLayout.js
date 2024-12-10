import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  // layout of the entire app
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 to-indigo-700 text-white">
      <Outlet />
    </div>
  );
};

export default AppLayout;
