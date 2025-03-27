import React, { useEffect, useState } from "react";

import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import JobCard from './JobCard';
import CompleteProfileToast from './ReusableComponents/CompleteProfileToast';
import { useDispatch, useSelector } from 'react-redux';
import {checkProfileCompleteRequest} from './../../store/slices/jobSeeker/isProfileCompleted/isProfileCompleteSlice'
import {getJobListRequest} from './../../store/slices/jobSeeker/job_List/jobListSlice';



const PAGE_SIZE = 6;


// Skeleton Card Here

const SkeletonCard = () => (
  <div className="border rounded-lg p-4 bg-gray-100 animate-pulse">
    <div className="border-b-2 border-gray-200 pb-3">
      <div className="flex items-center gap-2">
        <div className="p-1 h-12 w-12 rounded-md bg-gray-300"></div>
        <div className="flex flex-col space-y-1">
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
          <div className="w-32 h-5 bg-gray-300 rounded"></div>
        </div>
      </div>

      <div className="w-20 h-4 bg-gray-300 mt-3 rounded"></div>
    </div>

    <div className="flex flex-wrap gap-2 mt-2">
      <div className="w-16 h-6 bg-gray-300 rounded"></div>
      <div className="w-20 h-6 bg-gray-300 rounded"></div>
      <div className="w-24 h-6 bg-gray-300 rounded"></div>
    </div>

    <div className="w-full h-10 bg-gray-200 mt-3 rounded"></div>
  </div>
);

// Main Component Starts here

function JobListingContainer() {

  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(checkProfileCompleteRequest());
    dispatch(getJobListRequest());
  },[dispatch]);



  const isProfileCompleted = useSelector(state => state.isProfileComplete.isComplete);  

  const {loading} = useSelector((state) => state.isProfileComplete);

  // Job List State

  const JobListLoading = useSelector((state) => state.jobSeekerJobList.loading);

  // Job List From API

  const JobListFrmApi = useSelector((state) => state.jobSeekerJobList.jobList);

  // Filtered Jobs From API

  const filteredJobs = useSelector((state) => state.jobSeekerJobFilter.jobs);

  console.log("filteredJobs: ",filteredJobs);

  // Filtered Jobs Loading state

  const filteredJobsLoading = useSelector((state) => state.jobSeekerJobFilter.loading);


  console.log("Job List frm API: ", JobListFrmApi);


  const [isHidden, setIsHidden] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);


  const handleCompleteProfile = () =>{
    setIsHidden(!isHidden);
    navigate('/jobseeker/complete-profile-form/personal-info');  
  }

  const jobsToDisplay = filteredJobs.length > 0 ? filteredJobs : JobListFrmApi;

  const totalPages = Math.ceil(jobsToDisplay.length / PAGE_SIZE);
  
  const paginatedJobs = jobsToDisplay.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  

  return (
    <div className="py-6 px-1 md:px-6 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-2xl font-bold">
          {JobListFrmApi.length} job results
        </h2>
        <div className="flex space-x-2 items-center">
          <FiChevronLeft size={16} className="text-blue-600 cursor-pointer" />

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 border rounded-md ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <FiChevronRight size={16} className="text-blue-600 cursor-pointer" />
        </div>
      </div>
      <div className="relative">
        {/* Red Box (Centered & Above Job Cards) */}
        {!isProfileCompleted &&
          
          <CompleteProfileToast handleCompleteProfile={handleCompleteProfile}/>
          
        }

        {/* Job Cards (Behind Red Box) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          {paginatedJobs.map((job, index) =>
            isProfileCompleted && !loading && !JobListLoading && !filteredJobsLoading ?  (
              <JobCard key={index} job={job}  />
            ) : (
              <SkeletonCard key={index} />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default JobListingContainer;
