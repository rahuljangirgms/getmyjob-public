import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/buttons/recruitercomponent/Sidebar";
import RecruiterHeader from "./RecruiterHeader";

const RecruiterLayout = () => {
  return (
    // Make sure to add ml-64 so content starts after the pinned sidebar
    <div className="bg-gray-100 min-h-screen">
      {/* The pinned sidebar */}
      <Sidebar />

      {/* Main content shifted right by 64px (the sidebar width) */}
      <div className="ml-64 p-2">
        {/* If you want a scrolling area, wrap it in overflow-y-auto */}
        <RecruiterHeader/>
        <div className="w-full min-h-screen bg-white p-6 shadow-sm rounded">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RecruiterLayout;
