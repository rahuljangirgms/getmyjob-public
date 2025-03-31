import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Password visibility toggle icons


import { forgotPassword, resetPassword } from "../../../services/admin/authService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link } from "react-router-dom";
import breifcaseLogo from "./../../../assets/images/brief-case.png";
import avtarGroupImg from "./../../../assets/images/avtar-group.png";
const flipAnimation = {
  initial: { rotateY: 90, opacity: 0 },
  animate: { rotateY: 0, opacity: 1, transition: { duration: 0.6 } },
  exit: { rotateY: -90, opacity: 0, transition: { duration: 0.6 } },
};
const ForgotPassword = () => {
  const [step, setStep] = useState(1); // Step 1: Email Verification, Step 2: New Password
  const [email, setEmail] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [resetToken, setResetToken] = useState("");


  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Handle email input
  const handleEmailChange = (e) => setEmail(e.target.value);

  // Handle new password input
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);

  // Handle confirm password input
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  // Simulate email verification (for demonstration purposes)
  const handleEmailVerification = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      const res = await forgotPassword(email);

      if (res.status === true) {
        toast.success( "Email verified!");
        setResetToken(res.data.reset_pass_token); // ✅ only access if status is true
        setStep(2);
      } else {
        toast.error( "Something went wrong.");
      }

    } catch (error) {
      // Handle actual API or network errors
      toast.error( "Failed to verify email. Please try again later.");
    }
  };






  // Handle form submission for new password
  const handleSubmitNewPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await resetPassword({
        reset_pass_token: resetToken,
        email,
        password: newPassword,
      });
      toast.success(res.message || "Password successfully changed!");

      setTimeout(() => {
        window.location.href = "/admin/signin";
      }, 2000);
    } catch (error) {
      toast.error(error.message || "Failed to reset password.");
    }
  };


  return (
    <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-2 w-screen">


     


      {/* Sign Up Form Section */}
      <div className="flex flex-col justify-center items-center p-6  w-full h-screen bg-white shadow-lg rounded-lg">


        <motion.div>
          <ToastContainer position="top-right" autoClose={3000} />

        </motion.div>
        {step === 1 ? (
          // Step 1: Email Verification
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6 p-6 w-full"
          >
            <h2 className="text-2xl font-bold text-center text-gray-800">Forgot Password</h2>
            <p className="text-center text-gray-500">Please enter your email to reset your password.</p>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter Your email"
                required
                className="block min-w-full rounded-md bg-gray-100 px-4 py-2 text-base text-gray-900 font-medium border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="button"
              onClick={handleEmailVerification}
              className="w-full bg-blue-600 py-3 text-sm font-semibold text-white rounded-md hover:bg-blue-500 focus:outline-none"
            >
              Verify Email
            </button>

            <p className="my-4 text-sm text-gray-500 text-center">
              Remembered your password?{" "}
              <Link to="/admin/signin" className="font-semibold text-blue-600 hover:text-blue-500">
                Return to Sign In
              </Link>
            </p>

          </motion.div>
        ) : (
          // Step 2: New Password
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6 p-6 w-full"
          >
            <h2 className="text-2xl font-bold text-center text-gray-800">Create New Password</h2>
            <p className="text-center text-gray-500">Enter your new password below.</p>

            <div>
              <label htmlFor="new-password" className="block text-sm font-semibold text-gray-700">New Password</label>
              <div className="mt-2 relative">
                <input
                  id="new-password"
                  name="new-password"
                  type={passwordVisible ? "text" : "password"}
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  placeholder="Enter new password"
                  required
                  className="block w-full rounded-md bg-gray-100 px-4 py-2 text-base text-gray-900 font-medium border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute top-2 right-3 text-gray-500"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>


              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-semibold text-gray-700">Confirm Password</label>
              <div className="mt-2 relative">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={passwordVisible ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Confirm your password"
                  required
                  className="block w-full rounded-md bg-gray-100 px-4 py-2 text-base text-gray-900 font-medium border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSubmitNewPassword}
                className="w-full bg-blue-600 py-3 text-sm font-semibold text-white rounded-md hover:bg-blue-500 focus:outline-none"
              >
                Set New Password
              </button>
            </div>

            <p className="my-4 text-sm text-gray-500 text-center">
              Don't need to reset?{" "}
              <Link to="/admin/signin" className="font-semibold text-blue-600 hover:text-blue-500">
                Sign In to your account
              </Link>
            </p>

          </motion.div>
        )}
      </div>


      {/* Card Section - Visible on tablets and larger */}
      <div className="lg:flex flex-col justify-center bg-blue-600 hidden lg:block px-6 py-12">
        <div className="flex flex-row items-center mb-6">
          <img src={breifcaseLogo} height={50} width={50} />
          <p className="px-2 font-bold text-2xl text-white">AdminPanel</p>
        </div>
        <h3 className="text-sky-100 lg:text-4xl text-xl font-bold font-inter py-4">
          Recover your AdminPanel account.
        </h3>
        <p className="font-inter text-sky-50 font-normal text-sm">
          Use this page to recover your AdminPanel account and gain full access again. Reset your password securely and get back to managing your platform effortlessly.
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
};

export default ForgotPassword;
