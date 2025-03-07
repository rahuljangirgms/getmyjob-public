import React from "react";
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
import { useSelector } from 'react-redux';
import ProfileSkeleton from './../../../components/JobSeekerComponents/ReusableComponents/ProfileSkeleton';


const JobseekerDashboard = () => {

  const profileData = useSelector(state => state.profileForms.personalInformation);
  const isProfileCompleted = useSelector(state => state.profileForms.isProfileCompleted);
  
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
      isProfileCompleted ? <VerticalProfileCard profileData={profileData}/> : <ProfileSkeleton/>
    }
    </div>
  </div>
</div>

  );
};

export default JobseekerDashboard;
