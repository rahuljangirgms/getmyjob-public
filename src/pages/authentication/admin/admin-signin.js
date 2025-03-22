import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import breifcaseLogo from "./../../../assets/images/brief-case.png";
import avtarGroupImg from "./../../../assets/images/avtar-group.png";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Add the icons

import { login } from "../../../services/admin/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const flipAnimation = {
  initial: { rotateY: 90, opacity: 0 },
  animate: { rotateY: 0, opacity: 1, transition: { duration: 0.6 } },
  exit: { rotateY: -90, opacity: 0, transition: { duration: 0.6 } },
};

function AdminSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await login(email, password);

      toast.success(response.message || "Login successful!");

      // Store the token and user info
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      localStorage.setItem("permissions", JSON.stringify(response.permissions));

      // Redirect after login
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500);

    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
    }

  };

  return (
    <div
      className="min-h-screen flex flex-col lg:grid lg:grid-cols-2 w-screen"
      style={{
        backgroundImage: "linear-gradient(135deg, #FFFF 10%, #007FFF 110%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      
      {/* Login Form Section */}
      <div className="flex flex-col justify-center items-center p-6 md:p-12 w-full h-screen bg-white shadow-lg rounded-lg">
        <motion.div
          className="w-full p-6"
          variants={flipAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
        >

          <motion.div>
             <ToastContainer position="top-right" autoClose={3000} />
          </motion.div>

         
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Welcome back 🎉
          </h2>
          <p className="text-gray-500 text-center mt-2">
            Please enter your credentials to access your admin panel.
          </p>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Bind email state
                  placeholder="Enter Your email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-gray-100 px-4 py-2 text-base text-gray-900 font-medium border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"} // Toggle password visibility
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Bind password state
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-gray-100 px-4 py-2 text-base text-gray-900 font-medium border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute top-2 right-3 text-gray-500"
                  onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
                >
                  {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />} {/* Show/Hide icon */}
                </button>
              </div>
              <div className="flex justify-between mt-4 text-sm">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember-me"
                    name="remember-me"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="font-semibold text-gray-700 hover:text-blue-500 px-2">
                    Remember Me
                  </label>
                </div>
                <Link to="/admin/forgot-password" className="font-semibold text-blue-600 hover:text-blue-500">
                  Forgot password?
                </Link>
              </div>  
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Login to your account
              </button>
            </div>
          </form>

          {/* <p className="my-4 text-sm text-gray-500 text-center">
            Don't have an account?{" "}
            <Link to="/admin/signup" className="font-semibold text-blue-600 hover:text-blue-500">
              Sign Up
            </Link>
          </p> */}

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <button className="w-full flex items-center justify-center gap-2 bg-transparent border border-gray-600 text-gray-700 rounded-lg p-2 hover:bg-gray-100 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.68 12.1833C19.68 11.616 19.6291 11.0706 19.5345 10.5469H12V13.6415H16.3055C16.12 14.6415 15.5564 15.4888 14.7091 16.056V18.0633H17.2945C18.8073 16.6706 19.68 14.6197 19.68 12.1833Z" fill="#4285F4"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0007 19.9995C14.1607 19.9995 15.9716 19.2831 17.2952 18.0613L14.7097 16.054C13.9934 16.534 13.077 16.8177 12.0007 16.8177C9.91702 16.8177 8.15338 15.4104 7.52429 13.5195H4.85156V15.5922C6.16793 18.2068 8.87338 19.9995 12.0007 19.9995Z" fill="#34A853"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.52364 13.519C7.36364 13.039 7.27273 12.5263 7.27273 11.999C7.27273 11.4717 7.36364 10.959 7.52364 10.479V8.40625H4.85091C4.30909 9.48625 4 10.7081 4 11.999C4 13.2899 4.30909 14.5117 4.85091 15.5917L7.52364 13.519Z" fill="#FBBC05"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0007 7.18182C13.1752 7.18182 14.2297 7.58545 15.0588 8.37818L17.3534 6.08364C15.9679 4.79273 14.157 4 12.0007 4C8.87338 4 6.16793 5.79273 4.85156 8.40727L7.52429 10.48C8.15338 8.58909 9.91702 7.18182 12.0007 7.18182Z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>
          </div>
        </motion.div>
      </div>

      {/* Card Section - Visible on tablets and larger */}
      <div className="lg:flex flex-col justify-center bg-blue-600 hidden lg:block px-6 py-12">
        <div className="flex flex-row items-center mb-6">
          <img src={breifcaseLogo} height={50} width={50} />
          <p className="px-2 font-bold text-2xl text-white">AdminPanel</p>
        </div>
        <h3 className="text-sky-100 lg:text-4xl text-xl font-bold font-inter py-4">
          Manage your platform effortlessly.
        </h3>
        <p className="font-inter text-sky-50 font-normal text-sm ">
          The AdminPanel provides all the tools you need to manage and oversee your platform’s operations.
          Access reports, user data, and adjust settings in real-time to ensure smooth business operations.
        </p>
        <div className="flex items-center mt-12 justify-stretch">
          <img src={avtarGroupImg} height={150} width={150} />
          <p className="text-sky-50 text-2xl px-2 pb-1">|</p>
          <p className="text-sky-50 font-normal text-sm pt-1">
            Trusted by over <span className="text-sky-50 font-bold text-sm">15.5k</span> Admins and Managers
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminSignIn;
