import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import { motion } from "framer-motion";
import forgotLogo from "./../../../assets/images/forgot.png";
import breifcaseLogo from "./../../../assets/images/brief-case.png";
import sentmailLogo from "./../../../assets/images/sent-mail.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassRequest, clearAuthState } from "./../../../store/slices/jobSeeker/authentication/jobSeekerAuthSlice";
import { toast, ToastContainer } from "react-toastify";

function JobseekerForgetPass() {
  const [isSent, setIsSent] = useState(false);
  const message = useSelector((state) => state.jobSeekerAuth.message);
  const error = useSelector((state) => state.jobSeekerAuth.error);
  const status = useSelector((state) => state.jobSeekerAuth.status);
  // const email = useSelector((state) => state.jobSeekerAuth.email);

  const dispatch = useDispatch();

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
      setIsSent(status); 
    }
  }, [error]);

  useEffect(() => {
    if (message) {
      if(status){
        toast.success(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        
          navigate('/jobseeker/resetpassword');
      }
      else{
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
      setIsSent(status); // ✅ Move inside useEffect to update after message is received
    }
  }, [message]);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      dispatch(forgetPassRequest(values));
    
    },
  });


  

  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center items-center px-6 md:px-16 py-16" style={{ backgroundImage: "linear-gradient(135deg, #FFFF 10%, #007FFF 110%)", backgroundSize: "cover", backgroundPosition: "center" }}>
      <ToastContainer />
      {isSent ? (
        <motion.div className="flex flex-col items-center justify-center md:flex-col w-full max-w-6xl bg-transparent min-h-[500px] md:min-h-[650px]" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}>
          <div className="flex flex-col justify-center px-6 py-8 lg:px-12 bg-blue-600 w-full md:w-1/2 shadow-lg rounded-t-lg">
            <div className="flex flex-row items-center">
              <img src={breifcaseLogo} height={50} width={50} />
              <p className="px-2 font-bold text-2xl text-white">JobVerse</p>
            </div>
          </div>
          <div className="flex flex-col justify-center p-4 md:p-2 lg:p-12 w-full md:w-1/2 shadow-lg rounded-b-lg" style={{ backgroundColor: "#1A1F2C" }}>
            <div className="w-full p-4">
              <div className="flex justify-center items-center">
                <img src={sentmailLogo} height={80} width={80} />
              </div>
              <p className="text-2xl text-white font-bold font-inter text-center py-6">Email has been sent!</p>
              <p className="text-blue-200 font-semibold text-sm md:text-lg text-center">Please check your inbox and click in the received link to reset the password</p>
              <div className="flex w-full justify-center items-center pt-6">
                <BiLeftArrowAlt size={30} className="mx-1" color="#fff" />
                <Link to="/jobseeker/login" className="text-white font-semibold py-4 hover:text-blue-300">Back to Login</Link>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div className="flex flex-col items-center justify-center md:flex-col w-full max-w-6xl bg-transparent min-h-[500px] md:min-h-[650px]" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}>
          <div className="flex flex-col justify-center px-6 py-8 lg:px-12 bg-blue-600 w-full md:w-1/2 shadow-lg rounded-t-lg">
            <div className="flex flex-row items-center">
              <img src={breifcaseLogo} height={50} width={50} />
              <p className="px-2 font-bold text-2xl text-white">JobVerse</p>
            </div>
          </div>
          <div className="flex flex-col justify-center p-4 md:p-2 lg:p-12 w-full md:w-1/2 shadow-lg rounded-b-lg" style={{ backgroundColor: "#1A1F2C" }}>
            <div className="w-full p-4">
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="flex justify-center items-center">
                  <img src={forgotLogo} height={70} width={70} />
                </div>
                <p className="text-2xl text-white font-bold font-inter text-center">Forgot Password</p>
                <p className="text-blue-200 font-semibold text-sm md:text-base text-center">No worries, we'll send you reset instructions.</p>
                <div>
                  <label htmlFor="email" className="block text-sm/6 font-semibold text-slate-400">Email address</label>
                  <input id="email" name="email" type="email" placeholder="Enter Your email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className="block w-full rounded-md bg-gray-600 px-3 py-1.5 text-base text-white" />
                  {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm">{formik.errors.email}</p>}
                </div>
                <button type="submit" className="w-full rounded-md bg-blue-600 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-500">Reset Password</button>
              </form>
              <div className="flex w-full justify-center items-center pt-6">
                <BiLeftArrowAlt size={30} className="mx-1" color="#fff" />
                <Link to="/jobseeker/login" className="text-white font-semibold py-4 hover:text-blue-300">Back to Login</Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
export default JobseekerForgetPass;
