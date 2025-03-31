import React, { useEffect } from "react";
import {
  FiCalendar,
  FiMail,
  FiUser,
  FiArrowRight,
  FiBriefcase,
} from "react-icons/fi";
import { RiPhpFill } from "react-icons/ri";
import { AiOutlineJava } from "react-icons/ai";
import { IoLogoJavascript } from "react-icons/io5";
import { FaReact } from "react-icons/fa";

import avtar from "./../../../assets/images/userImages/avtar2.jpg";
import JobSearchComponent from "./../../../components/JobSeekerComponents/JobSearchComponent";
import JobFilterComponent from './../../../components/JobSeekerComponents/JobFilterComponent';
import JobListingContainer from './../../../components/JobSeekerComponents/JobListingContainer';
import VerticalProfileCard from './../../../components/JobSeekerComponents/VerticalProfileCard';
import { useDispatch, useSelector } from 'react-redux';
import ProfileSkeleton from './../../../components/JobSeekerComponents/ReusableComponents/ProfileSkeleton';
import { checkProfileCompleteRequest } from "./../../../store/slices/jobSeeker/isProfileCompleted/isProfileCompleteSlice";
import {getMasterResumeRequest} from './../../../store/slices/jobSeeker/master_Resume_Data/masterResumeSlice';
import {getpersonalInfoRequest} from './../../../store/slices/jobSeeker/Profile_Form/personalInfoSlice';
import {getOpenToWorkRequest} from './../../../store/slices/jobSeeker/openToWork/openToWorkSlice';
 
const JobseekerDashboard = () => {

  const dispatch = useDispatch();

  const personalInfo = useSelector((state) => state.personalInfoForm.data);
  const personalInfoLoading = useSelector((state) => state.personalInfoForm.loading);
  const openToWorkLoading = useSelector((state) => state.openToWork.loading);
  const openToWorkStatus = useSelector((state) => state.openToWork.openToWork);

  useEffect(()=>{
    dispatch(checkProfileCompleteRequest());
    dispatch(getpersonalInfoRequest());
    dispatch(getOpenToWorkRequest());
  },[dispatch]);


  console.log("API Profile Data: ",personalInfo);

    const isProfileCompleted = useSelector(
      (state) => state.isProfileComplete.isComplete
    );

  const isProfileCompleteLoading = useSelector((state) => state.isProfileComplete.loading);

  const {user} = useSelector((state) => state.jobSeekerAuth);

  console.log('Data frm dashbord _<', user);
  
  
  return (
<div className="flex min-h-screen bg-white flex-col pt-16 md:pt-20">
  {/* Job Search Component (Full Width) */}
  <JobSearchComponent />

  {/* Main Layout Section */}
  <div className="flex flex-wrap items-start h-full px-6 md:px-12">
    {/* Left Sidebar - Job Filters */}
    <div className="w-full md:w-1/5 py-6">
      <JobFilterComponent  />
    </div>

    {/* Center - Main Job Content */}
    <div className="w-full md:w-3/5">
      <JobListingContainer/>
    </div>

    {/* Right Sidebar (Optional for Extra Content) */}
    <div className="w-full md:w-1/5 py-6">
    {/* <JobFilterComponent /> */}
    {
      isProfileCompleted && !isProfileCompleteLoading && !personalInfoLoading && !openToWorkLoading && personalInfo ?
       <VerticalProfileCard profileData={personalInfo} isOpenToWork={openToWorkStatus}/> : <ProfileSkeleton/>
    }
    </div>
  </div>
</div>

  );
};

export default JobseekerDashboard;
