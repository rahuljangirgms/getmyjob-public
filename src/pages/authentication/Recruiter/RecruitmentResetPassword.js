import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordRequest } from "../../../store/slices/recruiter/authSlice";

const RecruitmentResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, message, error } = useSelector((state) => state.auth);

  // Local states for email, password, and token.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const location = useLocation();

  useEffect(() => {
    // Extract token and email from query parameters
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get("token");
    const encryptedEmailFromUrl = queryParams.get("email");

    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      if (encryptedEmailFromUrl) {
        // Decode the email parameter from URL encoding
        const encryptedEmail = decodeURIComponent(encryptedEmailFromUrl);
        console.log("encryptedEmail=====>",encryptedEmail)
        // Call the API to decrypt the email
        axios
          .post("https://recruitment.getmysolutions.in/api/v1/decrypt_email", { email: encryptedEmail })
          .then((response) => {
         console.log(response.data.data)
            if (response.data.data && response.data.data) {
              setEmail(response.data.data);
            } else {
              console.error("Decryption API did not return the email");
            }
          })
          .catch((error) => {
            console.error("Email decryption failed:", error);
          });
      }
    } else {
      console.error("No token provided in URL");
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the reset password action with token, decrypted email, and new password.
    dispatch(resetPasswordRequest({ token, email, password }));
    // Navigate to the login page after password reset (this might also be done in a success callback).
    navigate("/recruiter/login");
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gray-100 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white shadow-xl rounded-2xl overflow-hidden flex w-full max-w-4xl"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="w-1/2 p-10 bg-gradient-to-br from-yellow-200 to-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Reset Password</h2>
          <p className="text-sm text-gray-600 mb-6">
            Please enter your new password below.
          </p>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Prefilled, read-only email field */}
            <input
              type="email"
              name="email"
              value={email}
              readOnly
              className="w-full p-3 mb-3 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {/* New password field */}
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              className="w-full bg-yellow-500 text-white py-3 rounded-md hover:bg-yellow-600 transition"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </motion.button>
          </motion.form>
          {message && <p className="mt-4 text-green-600">{message}</p>}
          {error && <p className="mt-4 text-red-600">{error}</p>}
        </div>
        <motion.div
          className="w-1/2 relative bg-gray-200 flex items-center justify-center p-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={"../../../assets/images/group.jpg"}
            alt="Team"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default RecruitmentResetPassword;
