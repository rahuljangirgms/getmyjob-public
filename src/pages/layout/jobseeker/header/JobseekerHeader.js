import React, { useState } from "react";
import { FiSearch, FiBell, FiMenu, FiX } from "react-icons/fi";
import { LuMessageSquareText, LuUser, LuLogOut } from "react-icons/lu";
import { MdOutlinePassword } from "react-icons/md";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import avtar from "./../../../../assets/images/userImages/avtar2.jpg";
import breifcaseLogo from "./../../../../assets/images/brief-case.png";
import { Link } from "react-router-dom";
import ProfileDropdown from '../../../../components/JobSeekerComponents/ProfileDropdown';
import { CiSquareChevDown } from "react-icons/ci";
import { CiSquareChevUp } from "react-icons/ci";
import { LuPanelTopOpen } from "react-icons/lu";
import { LuPanelBottomOpen } from "react-icons/lu";
import { FaAnglesDown, FaAnglesUp, FaAngleUp } from "react-icons/fa6";
import { useSelector } from 'react-redux';


const JobseekerHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Controls mobile menu visibility
  const isProfileCompleted = useSelector(state => state.profileForms.isProfileCompleted);

  return (
    <header className="bg-white shadow-sm fixed top-0 w-full z-50 h-16 md:h-20 ">
      <div className="flex items-center justify-between px-1 py-2 md:px-6 md:py-3">
        
        {/* Left - Logo */}
        <Link className="flex items-center gap-4 cursor-pointer" to={'dashboard'}>
          <img src={breifcaseLogo} height={40} width={40} alt="JobVerse Logo" />
          <h1 className="text-xl font-bold px-2">JobVerse</h1>
        </Link>

        

        {/* Middle - Desktop Navigation (Hidden in Mobile) */}
        <div className="hidden lg:flex flex-1 justify-center">
          <div className="flex gap-x-10 items-center">
            <Link className="font-semibold text-blue-500 border-blue-500 border-b-2 transition-all duration-200">
              Find Jobs
            </Link>
            <Link className="font-semibold text-gray-500 hover:text-blue-500 hover:border-blue-500 hover:border-b-2 transition-all duration-200">
              Companies
            </Link>
            <Link className="font-semibold text-gray-500 hover:text-blue-500 hover:border-blue-500 hover:border-b-2 transition-all duration-200">
              Career Tips
            </Link>
          </div>
        </div>

        {/* Right - Notifications & Profile (Always Visible) */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-full">
            <LuMessageSquareText className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 p-2 bg-purple-600 rounded-full flex justify-center items-center text-white text-xs font-medium">
              2
            </span>
          </button>
          <button className="relative p-2 hover:bg-gray-100 rounded-full">
            <FiBell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 p-2 bg-red-600 rounded-full flex justify-center items-center text-white text-xs font-medium">
              5
            </span>
          </button>

          {/* Profile Section (Dropdown in Desktop & Mobile, but hide text on mobile) */}
         {isProfileCompleted &&  <ProfileDropdown/>}
        </div>

        {/* Mobile - Hamburger Menu */}
        <button
          className="block lg:hidden p-2 rounded-lg focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaAnglesUp  className="text-gray-500" size={20} /> : <FaAnglesDown className="text-gray-500" size={20} />}
        </button>
      </div>

      {/* Mobile Menu (Shows only when Hamburger Clicked) */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-md p-4 flex flex-col space-y-4 z-0">
          <ul className="space-y-2">
            {["Find Jobs", "Companies", "Career Tips"].map((section) => (
              <li
                key={section}
                className="cursor-pointer font-semibold px-3 py-2 transition-all duration-200 hover:text-blue-500 border-b border-gray-200"
              >
                {section}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default JobseekerHeader;
