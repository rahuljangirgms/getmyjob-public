import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import breifcaseLogo from "./../../../assets/images/brief-case.png";
import resetPassLogo from "./../../../assets/images/resetpass.png";
import PasswordStrengthBar from "react-password-strength-bar";
import { useDispatch, useSelector } from "react-redux";

import {
  clearAuthState,
  resetPassRequest,
} from "./../../../store/slices/jobSeeker/authentication/jobSeekerAuthSlice";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

function JobseekerResetPass() {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.jobSeekerAuth.message);
  const error = useSelector((state) => state.jobSeekerAuth.error);
  const status = useSelector((state) => state.jobSeekerAuth.status);
  const email = localStorage.getItem("email");

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearAuthState());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  }, [error]);

  useEffect(() => {
    if (message) {
      if (status) {
        toast.success(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });

      } else {
        toast.error(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    }
  }, [message, status]);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
      dispatch(resetPassRequest({ password: values.password, email: email }));
      setTimeout(()=>  navigate('/jobseeker/login'),3000);
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
      <ToastContainer />
      <motion.div
        className="flex flex-col items-center justify-center md:flex-col w-full max-w-6xl bg-transparent min-h-[500px] md:min-h-[650px]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <div className="flex flex-col justify-center px-6 py-8 lg:px-12 bg-blue-600 w-full md:w-1/2 shadow-lg rounded-t-lg">
          <div className="flex flex-row items-center">
            <img
              src={breifcaseLogo}
              height={50}
              width={50}
              alt="JobVerse Logo"
            />
            <p className="px-2 font-bold text-2xl text-white">JobVerse</p>
          </div>
        </div>

        <div
          className="flex flex-col justify-center p-4 md:p-2 lg:p-12 w-full md:w-1/2 shadow-lg rounded-b-lg"
          style={{ backgroundColor: "#1A1F2C" }}
        >
          <div className="w-full p-4">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="flex justify-center items-center">
                <img
                  src={resetPassLogo}
                  height={70}
                  width={70}
                  alt="Reset Password"
                />
              </div>
              <p className="text-2xl text-white font-bold font-inter text-center">
                Reset Password
              </p>
              <p className="text-blue-200 font-semibold text-sm md:text-base text-center">
                Please Kindly set your new password
              </p>
              <div>
                <label className="block text-sm font-semibold text-slate-400 py-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="block w-full rounded-md bg-gray-600 px-3 py-1.5 text-base text-white"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm py-1">
                    {formik.errors.password}
                  </p>
                )}
                <div className="py-2">
                  <PasswordStrengthBar password={formik.values.password} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold py-1 text-slate-400">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  className="block w-full rounded-md bg-gray-600 px-3 py-1.5 text-base text-white"
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="text-red-500 text-sm py-1">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
                <div className="py-2">
                  <PasswordStrengthBar
                    password={formik.values.confirmPassword}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-500"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default JobseekerResetPass;
