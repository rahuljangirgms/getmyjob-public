import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";

// Redux action
import { loginRequest } from "../../../store/slices/recruiter/authSlice";

// Assets & Components
import group from "../../../assets/images/group.jpg";
import CardGrid from "../../../components/buttons/recruitercomponent/CardGrid";
import TypingEffect from "../../../components/buttons/recruitercomponent/TypingEffect ";

const RecruitmentLogin = () => {
  const cardSectionRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ------------------------------
  // 1) Redux state
  // ------------------------------
  const { loading, error, message, token } = useSelector((state) => state.auth);

  // ------------------------------
  // 2) Local form state
  // ------------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ------------------------------
  // 3) Automatically navigate on success
  // ------------------------------
  useEffect(() => {
    if (token) {
      navigate("/recruiter/dashboard");
    }
  }, [token, navigate]);

  // ------------------------------
  // 4) Scroll function
  // ------------------------------
  const scrollToCards = () => {
    cardSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ------------------------------
  // 5) Handle form submission
  // ------------------------------
  const handleLogin = (e) => {
    e.preventDefault();
    // Dispatch login saga
    console.log(" before login request",loginRequest({ email, password, oauth_provider: "email_password" }))
    dispatch(loginRequest({ email, password, oauth_provider: "email_password" }));
    console.log(" after login request", dispatch(loginRequest({ email, password, oauth_provider: "email_password" })))
  };

  return (
    <div>
      {/* Login Section */}
      <motion.div
        className="flex min-h-screen bg-gradient-to-br from-blue-500 via-gray-100 to-white text-white p-10 items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Side - Background Content */}
        <div className="w-1/2 pr-12">
          <h1 className="text-5xl font-bold leading-tight text-gray-900">
            Decode India's largest talent pool with the power of{" "}
            <span className="text-blue-500"> AI</span>
          </h1>
          <ul className="mt-6 space-y-2 text-lg">
            <li className="flex items-center gap-2 text-gray-700">
              ✔ 10 crore+ registered jobseekers for all your talent needs
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              ✔ Most advanced recruitment{" "}
              <span className="text-yellow-500 drop-shadow-md">AI</span> lab
            </li>
          </ul>
          <button
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md text-lg font-medium hover:bg-blue-700 transition"
            onClick={scrollToCards}
          >
            Explore our products
          </button>
        </div>

        {/* Middle & Right - Combined Container */}
        <motion.div
          className="w-1/2 bg-white shadow-xl border border-gray-300 rounded-xl overflow-hidden flex"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Middle - Login Form */}
          <div className="w-1/2 bg-gradient-to-br from-gray-100 to-gray-300 p-10 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Sign in to your account
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Welcome back! Please login to continue.
            </p>

            {/* Display loading / errors / messages */}
            {loading && <p className="text-blue-600 mb-2">Logging in...</p>}
            {error && <p className="text-red-600 mb-2">{error}</p>}
            {message && <p className="text-green-600 mb-2">{message}</p>}

            <motion.form
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleLogin}
            >
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 mb-4 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 text-black mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="w-full bg-yellow-500 text-white py-3 rounded-md shadow-md hover:bg-yellow-600 transition"
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </motion.button>
            </motion.form>

            <div className="mt-4 flex justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="flex items-center shadow-md py-3 gap-2 px-4 text-black border border-gray-400 rounded-md bg-white"
              >
                <span>
                  <FcGoogle />
                </span>{" "}
                Google
              </motion.button>
            </div>

            <p className="text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <Link
                to="/recruiter/signup"
                className="text-blue-600 hover:text-blue-700"
              >
                Sign up
              </Link>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Forgot your password?{" "}
              <Link
                to="/recruiter/forgot-password"
                className="text-blue-600 hover:text-blue-700"
              >
                Reset here
              </Link>
            </p>
          </div>

          {/* Right - Image & Meeting Preview */}
          <motion.div
            className="w-1/2 relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={group}
              alt="Team"
              className="w-full h-full object-cover rounded-r-xl shadow-lg"
            />
            <motion.div
              className="absolute top-6 left-6 bg-blue-500 text-white text-sm px-3 py-1 rounded-lg shadow-md"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <TypingEffect text="Task Review With Team" delay={100} loopDelay={2000} />
              <p className="text-xs">03:30 PM - 04:00 PM</p>
            </motion.div>
            <motion.div
              className="absolute bottom-6 right-6 bg-gray-700 text-white text-sm px-3 py-2 rounded-lg shadow-md"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <TypingEffect text="Daily Meeting" delay={100} loopDelay={2000} />
              <p className="text-xs">12:00 PM - 01:00 PM</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Card Section Below Login */}
      <div
        ref={cardSectionRef}
        className="bg-gradient-to-br from-gray-50 to-gray-50 text-gray-900 p-10"
      >
        <h2 className="text-3xl font-bold text-center">
          Our Recruitment Services
        </h2>
        <CardGrid />
      </div>
    </div>
  );
};

export default RecruitmentLogin;
