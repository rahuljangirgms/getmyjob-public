import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { LuMessageSquareText } from "react-icons/lu";
import { FiBell } from "react-icons/fi";
import ThemeButton from "./ThemeButton";
import Notification from "./Notification";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../../services/admin/authService";

export default function Navbar() {
  const navigate = useNavigate();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [showPulseMessage, setShowPulseMessage] = useState(true);
  const [showPulseNotification, setShowPulseNotification] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    import("flowbite").then((flowbite) => flowbite.initFlowbite());
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogoutConfirm = () => {
    logout();
    navigate("/admin/signin");
  };

  // Get the permissions stored in localStorage after login
  const permissions = JSON.parse(localStorage.getItem("permissions") || "[]");

  // Helper function to check permission for a given menu key
  const hasPermission = (menuKey) => {
    const perm = permissions.find((item) => item.menu === menuKey);
    return perm && perm.view === 1;
  };

  return (
    <nav>
      {/* Top Navigation Bar */}
      <div className="fixed bg-white dark:bg-gray-900 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between mx-auto p-4 relative">
          {/* Admin Logo */}
          <Link to="/admin/dashboard" className="flex items-center space-x-3">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              <svg width="90" viewBox="0 0 208 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M60 8V14H0V10C0 9.33333 0.0666667 8.66667 0.2 8H60ZM60 56V62H0.2C0.0666667 61.3333 0 60.6667 0 60V56H60ZM208 8V14H148V10C148 9.33333 148.067 8.66667 148.2 8H208ZM208 56V60C208 60.6667 207.933 61.3333 207.8 62H148V56H208ZM60 0V6H0.8C1.30685 4.78248 2.03098 3.66732 2.937 2.709C4.68967 0.903 7.044 0 10 0H60ZM208 0V6H148.8C149.307 4.78248 150.031 3.66732 150.937 2.709C152.69 0.903 155.044 0 158 0H208ZM148 64H207.2C206.693 65.2179 205.969 66.3334 205.063 67.292C203.31 69.0973 200.956 70 198 70H148V64ZM60 64V70H10C6.06733 70 3.19967 68.4023 1.397 65.207C1.17708 64.8154 0.977806 64.4125 0.8 64H60ZM207.2 30H148.2C148.067 29.3333 148 28.6667 148 28V24H198C201.933 24 204.8 25.5977 206.603 28.793C206.823 29.1846 207.022 29.5875 207.2 30ZM208 34V38H158C154.067 38 151.2 36.4023 149.397 33.207C149.177 32.8154 148.978 32.4125 148.8 32H207.8C207.933 32.6667 208 33.3333 208 34ZM60 24V30H25V24H60ZM60 32V38H25V32H60ZM142 32V38H127V35L125.5 38H108.5L111.5 32H142ZM96.5 32L99.5 38H82.5L81 35V38H66V32H96.5ZM87.3 48H120.7L117.8 54H90.2L87.3 48ZM92.7 24L95.6 30H66V24H92.7ZM142 24V30H112.4L115.3 24H142ZM88.8 16L91.7 22H66V16H88.8ZM142 16V22H116.3L119.2 16H142ZM91.2 56H116.8L113.9 62H94.1L91.2 56ZM84.9 8L87.8 14H66V8H84.9ZM142 8V14H120.2L123.1 8H142ZM107.6 40H124.6L121.7 46H104.7L107.6 40ZM100.4 40L103.3 46H86.3L83.4 40H100.4ZM142 0V6H124.1L127 0H142ZM81 0L83.9 6H66V0H81ZM95.1 64H112.9L110 70H98L95.1 64ZM60 40V46H45V40H60ZM60 48V54H45V48H60ZM15 16V22H0V16H15ZM15 24V30H0V24H15ZM15 32V38H0V32H15ZM15 40V46H0V40H15ZM15 48V54H0V48H15ZM142 40V46H127V40H142ZM142 48V54H127V48H142ZM142 56V62H127V56H142ZM142 64V70H127V64H142ZM81 40V46H66V40H81ZM81 48V54H66V48H81ZM81 56V62H66V56H81ZM81 64V70H66V64H81ZM208 40V46H193V40H208ZM208 48V54H193V48H208ZM163 16V22H148V16H163Z"
                  fill="#BA1C1E"
                />
              </svg>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:w-auto" id="navbar-dropdown">
            <ul className="flex basis-128 flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {hasPermission("admin-dashboard") && (
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              {hasPermission("user-management") && (
                <li>
                  <button
                    id="dropdownNavbarLink"
                    data-dropdown-toggle="dropdownNavbar"
                    className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                  >
                    User Management
                    <svg
                      className="w-2.5 h-2.5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  <div
                    id="dropdownNavbar"
                    className="hidden z-40 absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:border-gray-600"
                  >
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                      {hasPermission("role-management") && (
                        <li>
                          <Link
                            to="/usermanagment/roles"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Role
                          </Link>
                        </li>
                      )}
                      {hasPermission("role-permission") && (
                        <li>
                          <Link
                            to="/usermanagment/permission"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Permission
                          </Link>
                        </li>
                      )}
                      {hasPermission("user-management") && (
                        <li>
                          <Link
                            to="/usermanagment/user"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Users
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </li>
              )}
              {hasPermission("jobseeker-management") && (
                <li>
                  <Link
                    to="/jobseekers"
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Job Seekers Management
                  </Link>
                </li>
              )}
              {hasPermission("recruiter-management") && (
                <li>
                  <Link
                    to="/recruiters"
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Recruiters Management
                  </Link>
                </li>
              )}
              {hasPermission("subscription-payment") && (
                <li>
                  <Link
                    to="/admin/subscriptionpayment"
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Subscription & Payment
                  </Link>
                </li>
              )}
              {hasPermission("reports-analytics") && (
                <li>
                  <Link
                    to="/admin/reportsanalytics"
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Reports & Analytics
                  </Link>
                </li>
              )}
              {/* Supports is always visible here; adjust if needed */}
              <li>
                <Link
                  to="/admin/supportmanagement"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Supports
                </Link>
              </li>
            </ul>
          </div>

          {/* Icons & Theme Toggle (Mobile & Desktop) */}
          <div className="flex items-center space-x-4">
            {/* (Optional) Message and Notification icons */}
            <ThemeButton />
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              type="button"
              data-drawer-target="drawer-navigation"
              data-drawer-show="drawer-navigation"
              aria-controls="drawer-navigation"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Notification showPulseNotification={showPulseNotification} />
            {/* Profile & Logout Dropdown omitted for brevity */}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        id="drawer-navigation"
        className="fixed top-0 left-0 z-40 h-screen m-0 p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-64 dark:bg-gray-800"
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
          Menu
        </h5>
        <button
          type="button"
          data-drawer-hide="drawer-navigation"
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {hasPermission("admin-dashboard") && (
              <li>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="ms-3">Dashboard</span>
                </Link>
              </li>
            )}
            {hasPermission("user-management") && (
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  aria-controls="dropdown-example"
                  data-collapse-toggle="dropdown-example"
                >
                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">User Management</span>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                <ul id="dropdown-example" className="py-2 space-y-2">
                  {hasPermission("role-management") && (
                    <li>
                      <Link
                        to="/usermanagment/roles"
                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Role
                      </Link>
                    </li>
                  )}
                  {hasPermission("role-permission") && (
                    <li>
                      <Link
                        to="/usermanagment/permission"
                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Permission
                      </Link>
                    </li>
                  )}
                  {hasPermission("user-management") && (
                    <li>
                      <Link
                        to="/usermanagment/user"
                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        Users
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            )}
            {hasPermission("jobseeker-management") && (
              <li>
                <Link
                  to="/jobseekers"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="ms-3">Job Seekers Management</span>
                </Link>
              </li>
            )}
            {hasPermission("recruiter-management") && (
              <li>
                <Link
                  to="/recruiters"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="ms-3">Recruiters Management</span>
                </Link>
              </li>
            )}
            {hasPermission("subscription-payment") && (
              <li>
                <Link
                  to="/admin/subscriptionpayment"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="ms-3">Subscription & Payment</span>
                </Link>
              </li>
            )}
            {hasPermission("reports-analytics") && (
              <li>
                <Link
                  to="/admin/reportsanalytics"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="ms-3">Reports & Analytics</span>
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/admin/supportmanagement"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="ms-3">Supports</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Message and Notification Drawers, Logout Modal, etc. remain unchanged */}
      {showLogoutModal && (
        <div
          id="logoutModal"
          tabIndex="-1"
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black/30"
        >
          <div className="bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Confirm Logout
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
              Are you sure you want to sign out?
            </p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
