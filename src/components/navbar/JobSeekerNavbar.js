import React, { useState } from "react";
import breifcaseLogo from "./../../assets/images/brief-case.png";
import { FaMoon } from "react-icons/fa6";
import { FiSun } from "react-icons/fi";
import { Link } from "react-router-dom";

function Navbar({ scrollToSection, activeSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleHamburgerClick = (section) =>{
    scrollToSection(section);
    setIsMenuOpen(!isMenuOpen);
  }

  // Toggle dark mode
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="w-full">
      <nav
        className={`${
          darkMode ? "bg-gray-900" : "bg-white"
        } border-gray-200 w-full fixed top-0 z-50 transition-all duration-300`}
      >
        <div className="max-w-screen-xl mx-auto p-4">
          {/* Top Bar with Logo and Controls */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={breifcaseLogo} className="h-9" alt="JobVerse Logo" />
              <p
                className={`px-1 font-bold text-2xl ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                JobVerse
              </p>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-8">
              <ul className="flex space-x-8">
                {["job", "process", "companies", "news", "pricing"].map(
                  (section) => (
                    <li
                      key={section}
                      className={`cursor-pointer block py-2 px-3  font-semibold ${
                        darkMode ? "text-white" : "text-black"
                      } ${
                        activeSection === section
                          ? "text-blue-500 border-blue-500 border-b-2 transition-all duration-200"
                          : ""
                      }`}
                      onClick={() => scrollToSection(section)}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex lg:items-center lg:space-x-4">
              <Link
                to="/jobseeker/login"
                className="px-4 py-2 bg-slate-700 rounded-3xl font-medium text-white hover:bg-blue-300 hover:text-blue-900 transition-all duration-200"
              >
                Login
              </Link>
              <Link
                to="/jobseeker/signup"
                className="px-4 py-2 bg-slate-700 rounded-3xl font-medium text-white hover:bg-blue-300 hover:text-blue-900 transition-all duration-200"
              >
                Sign Up
              </Link>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 hover:text-white"
              >
                {darkMode ? (
                  <FiSun size={20} className="dark:text-white" />
                ) : (
                  <FaMoon size={20} />
                )}
              </button>
            </div>

            {/* Mobile/Tablet Controls */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
              >
                {darkMode ? (
                  <FiSun size={20} className="dark:text-white" />
                ) : (
                  <FaMoon size={20} />
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-user"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Toggle menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile/Tablet Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4">
              <ul
                className={`flex flex-col font-medium space-y-2 ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                {["job", "process","companies",  "news", "pricing"].map(
                  (section) => (
                    <li
                      key={section}
                      className={`cursor-pointer block py-2 px-3  font-semibold ${
                        darkMode ? "text-white" : "text-black"
                      } ${
                        activeSection === section
                          ? "text-blue-500 border-blue-500 border-b-2 transition-all duration-200"
                          : ""
                      }`}
                      onClick={() => handleHamburgerClick(section)}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </li>
                  )
                )}
              </ul>

              {/* Mobile/Tablet Login/Signup */}
              <div className="mt-4 space-y-2">
                <Link
                  to="/jobseeker/login"
                  className="block w-full px-4 py-2 bg-slate-700 rounded-3xl font-medium text-white hover:bg-blue-300 hover:text-blue-900 text-center transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/jobseeker/signup"
                  className="block w-full px-4 py-2 bg-slate-700 rounded-3xl font-medium text-white hover:bg-blue-300 hover:text-blue-900 text-center transition-all duration-200"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
      {/* Add padding to prevent content from hiding under fixed navbar */}
      <div className="h-16"></div>
    </div>
  );
}

export default Navbar;
