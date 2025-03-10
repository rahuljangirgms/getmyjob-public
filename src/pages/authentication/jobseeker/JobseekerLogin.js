import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginRequest,clearAuthState } from "./../../../store/slices/jobSeeker/authentication/jobSeekerAuthSlice";
import breifcaseLogo from "./../../../assets/images/brief-case.png";
import avtarGroupImg from "./../../../assets/images/avtar-group.png";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";

const flipAnimation = {
  initial: { rotateY: 90, opacity: 0 },
  animate: { rotateY: 0, opacity: 1, transition: { duration: 0.6 } },
  exit: { rotateY: -90, opacity: 0, transition: { duration: 0.6 } },
};

function JobseekerLogin() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const message = useSelector((state) => state.jobSeekerAuth.message);

  const error = useSelector((state) => state.jobSeekerAuth.error);

  const token = useSelector((state) => state.jobSeekerAuth.token);

  const navigate = useNavigate();
  
  useEffect(() => {
    if (token) {
      navigate('/jobseeker/dashboard'); // ✅ Navigate only when token is updated
    }
  }, [token, navigate]); // ✅ Runs when `token` updates

  useEffect(() => {
    dispatch(clearAuthState()); // ✅ Clear previous messages and errors on component mount
  }, [dispatch]);


  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000, // Closes after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  }, [error, dispatch]);

  // useEffect(() => {
  //   if (message) {
  //     toast.error(message, {
  //       position: "top-right",
  //       autoClose: 3000, // Closes after 3 seconds
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       theme: "dark",
  //     });

      

  //    // console.log("Tost Msg: ", message);
  //   }
  // }, [message, dispatch]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      oauth_provider: "email_password",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      dispatch(loginRequest(values));

    },
  });

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row justify-center items-center px-6 md:px-16 py-16"
      style={{
        backgroundImage: "linear-gradient(135deg, #FFFF 10%, #007FFF 110%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ToastContainer/>
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-transparent min-h-[500px] md:min-h-[650px]">
        <div className="flex flex-col justify-center px-6 py-12 lg:px-12 bg-blue-600 w-full md:w-1/2 shadow-lg rounded-t-lg md:rounded-bl-lg md:rounded-tr-none">
          <div className="flex flex-row items-center">
            <img src={breifcaseLogo} height={50} width={50} alt="logo" />
            <p className="px-2 font-bold text-2xl text-white">JobVerse</p>
          </div>
          <h3 className="text-sky-100 lg:text-4xl text-xl font-bold font-inter py-4">
            Explore the world's leading job opportunities.
          </h3>
          <p className="font-inter text-sky-50 font-normal text-sm">
            Millions of professionals and top companies around the world connect
            on JobVerse the home to the best career opportunities and hiring
            solutions for job seekers and employers alike.
          </p>
          <div className="flex items-center mt-12 justify-start">
            <img src={avtarGroupImg} height={150} width={150} alt="users" />
            <p className="text-sky-50 text-2xl px-2 pb-1">|</p>
            <p className="text-sky-50 font-normal text-sm pt-1">
              Over <span className="text-sky-50 font-bold text-sm">15.5k</span>{" "}
              Happy users
            </p>
          </div>
        </div>
        <div
          className="flex flex-col justify-center p-4 md:p-2 lg:p-12 w-full md:w-1/2 shadow-lg rounded-b-lg md:rounded-e-lg md:rounded-b-none"
          style={{ backgroundColor: "#1A1F2C" }}
        >
          <motion.div
            className="w-full p-4"
            variants={flipAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <p className="text-2xl text-white font-bold font-inter">
                Welcome back 🎉
              </p>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-slate-400"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter Your email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="block w-full rounded-md bg-gray-600 px-3 py-1.5 text-white"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-slate-400"
                >
                  Password
                </label>
                <div className="mt-2 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="block w-full rounded-md bg-gray-600 px-3 py-1.5 text-white"
                  />
                  <span
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible
                        size={20}
                        className="text-gray-700"
                      />
                    ) : (
                      <AiOutlineEye size={20} className="text-gray-700" />
                    )}
                  </span>
                </div>
              </div>
              <div className="py-1 flex justify-end">
              <Link to='/jobseeker/forgetpassword' className="font-bold text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </Link>
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-blue-600 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-500"
              >
                Login to your account
              </button>
            </form>
            <p className="text-sm text-gray-500 text-center mt-4">
              Don't have an account?{" "}
              <Link to="/jobseeker/signup" className="text-blue-600">
                Sign Up
              </Link>
            </p>
            <button className="w-full flex items-center justify-center gap-2 bg-transparent border border-gray-600 text-white rounded-lg p-2 mt-4 hover:bg-gray-700">
              <FcGoogle size={22} /> Sign in with Google
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default JobseekerLogin;
