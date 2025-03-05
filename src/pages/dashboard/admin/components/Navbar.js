import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { LuMessageSquareText } from "react-icons/lu";
import { FiBell } from "react-icons/fi";
import ThemeButton from "./ThemeButton";

import { Link } from "react-router-dom";


export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

   useEffect(() => {
    import("flowbite").then((flowbite) => flowbite.initFlowbite());
  }, []);

  // State to manage pulse effect
  const [showPulseMessage, setShowPulseMessage] = useState(true);
  const [showPulseNotification, setShowPulseNotification] = useState(true);


  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (


    <nav >


      <div className="fixed bg-white dark:bg-gray-900  w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600  ">
        <div className=" flex items-center justify-between mx-auto p-4 relative">

          {/* Admin Logo */}
          <Link to="/admin/dashboard" className="flex items-center space-x-3">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">

              <svg width="90" viewBox="0 0 208 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M60 8V14H0V10C0 9.33333 0.0666667 8.66667 0.2 8H60ZM60 56V62H0.2C0.0666667 61.3333 0 60.6667 0 60V56H60ZM208 8V14H148V10C148 9.33333 148.067 8.66667 148.2 8H208ZM208 56V60C208 60.6667 207.933 61.3333 207.8 62H148V56H208ZM60 0V6H0.8C1.30685 4.78248 2.03098 3.66732 2.937 2.709C4.68967 0.903 7.044 0 10 0H60ZM208 0V6H148.8C149.307 4.78248 150.031 3.66732 150.937 2.709C152.69 0.903 155.044 0 158 0H208ZM148 64H207.2C206.693 65.2179 205.969 66.3334 205.063 67.292C203.31 69.0973 200.956 70 198 70H148V64ZM60 64V70H10C6.06733 70 3.19967 68.4023 1.397 65.207C1.17708 64.8154 0.977806 64.4125 0.8 64H60ZM207.2 30H148.2C148.067 29.3333 148 28.6667 148 28V24H198C201.933 24 204.8 25.5977 206.603 28.793C206.823 29.1846 207.022 29.5875 207.2 30ZM208 34V38H158C154.067 38 151.2 36.4023 149.397 33.207C149.177 32.8154 148.978 32.4125 148.8 32H207.8C207.933 32.6667 208 33.3333 208 34ZM60 24V30H25V24H60ZM60 32V38H25V32H60ZM142 32V38H127V35L125.5 38H108.5L111.5 32H142ZM96.5 32L99.5 38H82.5L81 35V38H66V32H96.5ZM87.3 48H120.7L117.8 54H90.2L87.3 48ZM92.7 24L95.6 30H66V24H92.7ZM142 24V30H112.4L115.3 24H142ZM88.8 16L91.7 22H66V16H88.8ZM142 16V22H116.3L119.2 16H142ZM91.2 56H116.8L113.9 62H94.1L91.2 56ZM84.9 8L87.8 14H66V8H84.9ZM142 8V14H120.2L123.1 8H142ZM107.6 40H124.6L121.7 46H104.7L107.6 40ZM100.4 40L103.3 46H86.3L83.4 40H100.4ZM142 0V6H124.1L127 0H142ZM81 0L83.9 6H66V0H81ZM95.1 64H112.9L110 70H98L95.1 64ZM60 40V46H45V40H60ZM60 48V54H45V48H60ZM15 16V22H0V16H15ZM15 24V30H0V24H15ZM15 32V38H0V32H15ZM15 40V46H0V40H15ZM15 48V54H0V48H15ZM142 40V46H127V40H142ZM142 48V54H127V48H142ZM142 56V62H127V56H142ZM142 64V70H127V64H142ZM81 40V46H66V40H81ZM81 48V54H66V48H81ZM81 56V62H66V56H81ZM81 64V70H66V64H81ZM208 40V46H193V40H208ZM208 48V54H193V48H208ZM163 16V22H148V16H163Z" fill="#BA1C1E" />
              </svg>


            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:w-auto" id="navbar-dropdown">
            <ul className="flex basis-128 flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to="/admin/dashboard" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent">Dashboard</Link>
              </li>
              <li>
                <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                  User Management
                  <svg className="w-2.5 h-2.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>

                <div id="dropdownNavbar" className="hidden z-40 absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:border-gray-600">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                    <li>
                      <Link to="/usermanagment/roles" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Role</Link>
                    </li>
                    <li>
                      <Link to="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Permission</Link>
                    </li>
                  </ul>
                </div>
              </li>
 <li>
                 <Link to="/jobseekers" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Job Seekers Management</Link>
              </li>
 <li>
                <Link to="/recruiters" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Recruiters Management</Link>
              </li>

       
              <li>
               <Link to="/admin/subscriptionpayment" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Subscription & Payment</Link>
              </li>




              <li>
                <Link to="/admin/reportsanalytics" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"> Reports & Analytics</Link>
              </li>

               <li>
                <Link to="/admin/supportmanagement" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"> Supports</Link>
              </li>

            </ul>
          </div>

          {/* Icons & Theme Toggle (Mobile & Desktop) */}
          <div className="flex items-center space-x-4">



            {/* Message Button */}
            <button
              className="relative p-2 bg-gray-50 hover:bg-gray-100 rounded-full dark:bg-gray-800 dark:hover:bg-gray-700"
              type="button"
              data-drawer-target="drawer-message-example"
              data-drawer-show="drawer-message-example"
              data-drawer-placement="right"
              aria-controls="drawer-message-example"
              onClick={() => setShowPulseMessage(false)}
            >
              <LuMessageSquareText className="w-5 h-5 text-gray-700 dark:text-gray-300" />

              {/* Notification Badge with Pulse Effect */}
              <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5">
                {showPulseMessage && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
                )}
                <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-white text-xs font-medium border-2 border-white dark:border-gray-900">
                  2
                </span>
              </span>
            </button>

            {/* Notification Drawer Button */}
            <button
              className="relative p-2 bg-gray-50 hover:bg-gray-100 rounded-full dark:bg-gray-800 dark:hover:bg-gray-700"
              type="button"
              data-drawer-target="drawer-right-example"
              data-drawer-show="drawer-right-example"
              data-drawer-placement="right"
              aria-controls="drawer-right-example"
              onClick={() => setShowPulseNotification(false)}
            >
              <FiBell className="w-5 h-5 text-gray-700 dark:text-gray-300" />

              {/* Notification Badge with Pulse Effect */}
              <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5">
                {showPulseNotification && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                )}
                <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-xs font-medium border-2 border-white dark:border-gray-900">
                  5
                </span>
              </span>
            </button>

            {/* dropdown profile*/}
            <div id="dropdownprofileLink" data-dropdown-toggle="dropdownprofile" class="relative inline-flex hover:cursor-pointer items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <span class="font-medium text-gray-600 dark:text-gray-300">JM</span>
            </div>



            <div id="dropdownprofile" class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg border-gray-300 border-2 dark:border-slate-600 shadow-lg w-44 dark:bg-gray-700 dark:divide-gray-600">
              <ul class="py-1 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                <li>
                  <a href="/admin/dashboard" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                </li>
                <li>
                  <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                </li>
                <li>
                  <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                </li>
              </ul>
              <div class="py-1">
                <a href="/admin/signin" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
              </div>
            </div>

            {/* Theme Toggle */}
            <ThemeButton />

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="p-2 md:hidden rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" type="button" data-drawer-target="drawer-navigation" data-drawer-show="drawer-navigation" aria-controls="drawer-navigation">
              {<Menu className="w-6 h-6" />}
            </button>









          </div>

        </div>
      </div>


      {/* navigation Drawer */}
      <div id="drawer-navigation" class="fixed top-0 left-0 z-40 h-screen m-0 p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-64 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-navigation-label">
        <h5 id="drawer-navigation-label" class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5>
        <button type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span class="sr-only">Close menu</span>
        </button>
        <div class="py-4 overflow-y-auto">
          <ul class="space-y-2 font-medium">
            <li>
              <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span class="ms-3">Dashboard</span>
              </a>
            </li>
            <li>
              <button type="button" class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                <svg class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">User Management</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
              <ul id="dropdown-example" class=" py-2 space-y-2">
                <li>
                  <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Job Seekers Management</a>
                </li>
                <li>
                  <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Recruiters Management</a>
                </li>

              </ul>
            </li>
            <li>
              <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Subscription & Payment</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Reports & Analytics</span>
              </a>
            </li>

             <li>
              <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Supports</span>
              </a>
            </li>

          </ul>
        </div>
      </div>


      {/* Message Drawer */}
      <div id="drawer-message-example" className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800" aria-labelledby="drawer-message-label">

        <div className="flex items-center gap-2 mb-4">

          <svg class="w-5 h-5 text-green-600 dark:text-green-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3.546l3.2 3.659a1 1 0 0 0 1.506 0L13.454 14H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-8 10H5a1 1 0 0 1 0-2h5a1 1 0 1 1 0 2Zm5-4H5a1 1 0 0 1 0-2h10a1 1 0 1 1 0 2Z" />
          </svg>
          <h5 id="drawer-message-label" className="inline-flex items-center  text-base font-semibold text-gray-500 dark:text-gray-400">
            Messages
          </h5>



        </div>

        {/* Close Button */}
        <button type="button" data-drawer-hide="drawer-message-example" className="absolute top-2.5 right-2.5 text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <X className="w-5 h-5" />
        </button>

        {/* Message Content */}
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          You have <span className="font-bold">3 new messages</span>.
        </p>

        {/* Message List */}
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-3">
            <a href="#" className="flex items-center space-x-4 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg">
              <img className="w-10 h-10 rounded-full" src="https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-1.png" alt="User Avatar" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">John Doe</p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">Hey, can we discuss the project?</p>
              </div>
            </a>
          </li>
          <li className="py-3">
            <a href="#" className="flex items-center space-x-4 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg">
              <img className="w-10 h-10 rounded-full" src="https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-2.png" alt="User Avatar" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">Jane Smith</p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">I sent you the files, please check.</p>
              </div>
            </a>
          </li>
        </ul>
      </div>


      {/* Notification Drawer */}
      <div id="drawer-right-example" className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800" aria-labelledby="drawer-right-label">
        <div className="flex items-center gap-2 mb-4">
          <svg class="w-5 h-5 text-yellow-400 dark:text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M15.133 10.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C4.867 13.018 3 13.614 3 14.807 3 15.4 3 16 3.538 16h12.924C17 16 17 15.4 17 14.807c0-1.193-1.867-1.789-1.867-4.175ZM4 4a1 1 0 0 1-.707-.293l-1-1a1 1 0 0 1 1.414-1.414l1 1A1 1 0 0 1 4 4ZM2 8H1a1 1 0 0 1 0-2h1a1 1 0 1 1 0 2Zm14-4a1 1 0 0 1-.707-1.707l1-1a1 1 0 1 1 1.414 1.414l-1 1A1 1 0 0 1 16 4Zm3 4h-1a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2ZM6.823 17a3.453 3.453 0 0 0 6.354 0H6.823Z" />
          </svg>
          <h5 id="drawer-right-label" className="inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400">
            Notifications
          </h5>

        </div>



        <button type="button" data-drawer-hide="drawer-right-example" className="absolute top-2.5 right-2.5 text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <X className="w-5 h-5" />
        </button>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          You have <span className="font-bold">5 new notifications</span>.
        </p>

        {/* Notifications List */}
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {/* Notification Item 1 */}
          <li className="py-3">
            <a href="#" className="flex items-center space-x-4 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">New Job Posted</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">A recruiter posted a new job for a Developer role.</p>
              </div>
              <span className="text-xs text-gray-400">5 min ago</span>
            </a>
          </li>

          {/* Notification Item 2 */}
          <li className="py-3">
            <a href="#" className="flex items-center space-x-4 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Message from HR</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Your application has been reviewed.</p>
              </div>
              <span className="text-xs text-gray-400">30 min ago</span>
            </a>
          </li>

          {/* Notification Item 3 */}
          <li className="py-3">
            <a href="#" className="flex items-center space-x-4 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">New Connection Request</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">John Doe sent you a connection request.</p>
              </div>
              <span className="text-xs text-gray-400">1 hr ago</span>
            </a>
          </li>

          {/* Notification Item 4 */}
          <li className="py-3">
            <a href="#" className="flex items-center space-x-4 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Subscription Expiring</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Your premium plan expires in 3 days.</p>
              </div>
              <span className="text-xs text-gray-400">2 hrs ago</span>
            </a>
          </li>

          {/* Notification Item 5 */}
          <li className="py-3">
            <a href="#" className="flex items-center space-x-4 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">System Update</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">New security patch has been applied.</p>
              </div>
              <span className="text-xs text-gray-400">3 hrs ago</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
