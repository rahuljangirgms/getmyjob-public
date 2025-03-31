import React, { useEffect } from "react";
import breifcaseLogo from "./../../../../assets/images/brief-case.png";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BiLeftArrowAlt } from "react-icons/bi";
import forgotLogo from "./../../../../assets/images/change_password.png";
import {
  changePasswordRequest,
  clearChangePasswordMessages,
} from "./../../../../store/slices/jobSeeker/changePassword/changePassowordSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import {logout} from  './../../../../store/slices/jobSeeker/authentication/jobSeekerAuthSlice'
import ChangePasswordSkeleton from './../../../../components/JobSeekerComponents/ReusableComponents/ChangePasswordSkeleton';


function ChangePassword() {
  //change password State

  const { loading, message,status } = useSelector(
    (state) => state.jobSeekerChangePass
  );

  const dispatch = useDispatch();

  useEffect(() => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      className: "bg-green-50 text-green-700",
    });
    dispatch(clearChangePasswordMessages());

    setTimeout(()=>{
      if(status){
        dispatch(logout());
      }
    },3000)
    
  }, [message]);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      oldpassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Old Password is required"),
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New Password is required"),
    }),
    onSubmit: (values) => {
      dispatch(changePasswordRequest(values));
    },
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 mt-10 md:mt-16 h-lvh no-scrollbar bg-white items-center justify-center">


      {loading ? (
        <ChangePasswordSkeleton />
      ) : (
        <div className="flex flex-col items-center justify-center md:flex-col w-full bg-transparent min-h-[500px] md:min-h-[750px]">
          <div
            className="flex flex-col justify-center p-4 md:p-2 lg:p-12 w-full md:w-1/3 shadow-xl rounded-lg"
            style={{ backgroundColor: "#1A1F2C" }}
          >
            <div className="w-full p-4">
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="flex justify-center items-center">
                  <img src={forgotLogo} height={70} width={70} />
                </div>
                <p className="text-2xl text-white font-bold font-inter text-center">
                  Change Password
                </p>
                <p className="text-blue-200 font-semibold text-sm md:text-base text-center">
                  Always use secure Passwords
                </p>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-semibold text-slate-400"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter Your email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="block w-full rounded-md bg-gray-600 px-3 py-1.5 text-base text-white"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm py-1">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold py-1 text-slate-400">
                    Old Password
                  </label>
                  <input
                    id="oldpassword"
                    name="oldpassword"
                    type="password"
                    placeholder="Enter your old password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.oldpassword}
                    className="block w-full rounded-md bg-gray-600 px-3 py-1.5 text-base text-white"
                  />
                  {formik.touched.oldpassword && formik.errors.oldpassword && (
                    <p className="text-red-500 text-sm py-1">
                      {formik.errors.oldpassword}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold py-1 text-slate-400">
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    placeholder="Enter your New password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.newPassword}
                    className="block w-full rounded-md bg-gray-600 px-3 py-1.5 text-base text-white"
                  />
                  {formik.touched.newPassword && formik.errors.newPassword && (
                    <p className="text-red-500 text-sm py-1">
                      {formik.errors.newPassword}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-blue-600 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-500"
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChangePassword;
