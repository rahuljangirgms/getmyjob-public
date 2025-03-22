import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Briefcase, Users, MessageSquare, BarChart, Settings } from "lucide-react";
import RecruiterHeader from "../../../pages/layout/recruiter/RecruiterHeader";
import { useSelector } from "react-redux";
import { hasPermission } from "../../../utils/permissionHelpers";

const Sidebar = () => {
  const location = useLocation(); // Get the current route
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg p-5 flex flex-col">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Recruiter Panel</h2>
      <nav className="flex flex-col space-y-4">
        {hasPermission(user, "dashboard", "view") && (
          <SidebarLink to="/recruiter/dashboard" icon={<Home size={20} />} label="Dashboard" currentPath={location.pathname} />
        )}
        {hasPermission(user, "company profile", "view") && (
          <SidebarLink to="/recruiter/dashboard/companies" icon={<Briefcase size={20} />} label="Companies Management" currentPath={location.pathname} />
        )}
        {hasPermission(user, "job management", "view") && (
          <SidebarLink to="/recruiter/dashboard/jobs" icon={<Briefcase size={20} />} label="Job Management" currentPath={location.pathname} />
        )}
        {hasPermission(user, "users", "view") && (
          <SidebarLink to="/recruiter/dashboard/users" icon={<Users size={20} />} label="Users" currentPath={location.pathname} />
        )}
        {hasPermission(user, "candidate", "view") && (
          <SidebarLink to="/recruiter/dashboard/candidates" icon={<Users size={20} />} label="Candidates" currentPath={location.pathname} />
        )}
        {hasPermission(user, "interview", "view") && (
          <SidebarLink to="/recruiter/dashboard/interview" icon={<Settings size={20} />} label="Interview" currentPath={location.pathname} />
        )}
        <SidebarLink to="/recruiter/dashboard/messages" icon={<MessageSquare size={20} />} label="Messages" currentPath={location.pathname} />
        <SidebarLink to="/recruiter/dashboard/reports" icon={<BarChart size={20} />} label="Reports" currentPath={location.pathname} />
        <SidebarLink to="/recruiter/dashboard/settings" icon={<Settings size={20} />} label="Settings" currentPath={location.pathname} />
      </nav>
    </div>
  );
};

const SidebarLink = ({ to, icon, label, currentPath }) => {
  const isActive = currentPath === to;
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 p-2 rounded transition ${
        isActive ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-100 text-gray-700"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
};

export default Sidebar;
