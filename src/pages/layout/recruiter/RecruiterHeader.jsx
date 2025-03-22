import React, { useState, useEffect, useRef } from "react";
import {
  HelpCircle,
  Bell,
  MessageSquare,
  User,
  ChevronDown,
  Wallet,
  Repeat,
  Settings,
  LayoutDashboard,
  Search,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/slices/recruiter/authSlice";

const RecruiterHeader = () => {
  // State to handle whether the dropdown is open
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const dispatch = useDispatch();
const navigate = useNavigate()
  // We'll use a ref to detect clicks outside the dropdown
  const dropdownRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  console.log("loggedin user", user);
  // Toggle the dropdown open/closed
  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close the dropdown if user clicks outside it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleLogout = ()=>{
    dispatch(logout());
    navigate("/recruiter/login")

  }

  return (
    <header className="bg-white shadow p-4 flex items-center justify-end">
      {/* Container for right-side actions */}
      <nav className="flex items-center space-x-6">
        {/* Help */}
        <a
          href="#"
          className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
        >
          <HelpCircle className="w-5 h-5" />
          <span className="hidden sm:inline-block">Help</span>
        </a>

        {/* Notifications */}
        <a
          href="#"
          className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
        >
          <Bell className="w-5 h-5" />
          <span className="hidden sm:inline-block">Notifications</span>
        </a>

        {/* Messages */}
        <a
          href="#"
          className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="hidden sm:inline-block">Messages</span>
        </a>

        {/* Vertical Separator */}
        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* User dropdown container */}
        <div className="relative" ref={dropdownRef}>
          {/* User button to toggle dropdown */}
          <button
            onClick={handleDropdownToggle}
            className="flex items-center space-x-2 cursor-pointer hover:text-gray-900 focus:outline-none"
          >
            <User className="w-6 h-6" />
            <span className="text-gray-700 text-sm">{user.email}</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg py-2 z-50">
              <Link
                to="/recruiter/dashboard/billing-plans"
                className="flex items-center  gap-1 px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <Wallet className="w-4 h-4" />
                <span>Billing and invoices</span>
              </Link>
              <Link
                to="/recruiter/dashboard/subscriptions"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <Repeat className="w-4 h-4" />
                <span>Subscriptions</span>
              </Link>
              <Link
                to="/recruiter/dashboard/employeer-settings"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <Settings className="w-4 h-4" />
                <span>Employer settings</span>
              </Link>
              <Link
                to="/recruiter/dashboard/companies"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Company page</span>
              </Link>
              <Link
                to="/recruiter/dashboard/users"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <User className="w-4 h-4" />
                <span>Users</span>
              </Link>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Contact us</span>
              </a>
              <div className="border-t my-2"></div>
              <Link
                to="/recruiter/dashboard/account-settings"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <Settings className="w-4 h-4" />
                <span>Account settings</span>
              </Link>
              <Link
                to="/jobseeker"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <Search className="w-4 h-4" />
                <span>Visit jobseeker page</span>
              </Link>
              <button
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default RecruiterHeader;
