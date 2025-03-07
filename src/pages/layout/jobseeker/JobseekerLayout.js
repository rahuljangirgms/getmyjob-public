import { useState } from "react";
import JobseekerHeader from "./header/JobseekerHeader";
import { Outlet } from "react-router-dom";
import JobseekerFooter from "./footer/JobseekerFooter";

const JobseekerLayout = () => {



  // State to control sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}

      {/* <JobseekerSideBar isSidebarOpen={isSidebarOpen} /> */}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}

        <JobseekerHeader/>

          {/* Dynamic Content (Dashboard or Other Pages) */}
         <div className="w-full">
         <Outlet />
         </div>

        <JobseekerFooter />
      </main>
    </div>  
  );
};

export default JobseekerLayout;
