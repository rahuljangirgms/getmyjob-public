import React, { useState } from "react";

import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { FaAnglesRight } from "react-icons/fa6";
import { LuFileUser } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import JobCard from './JobCard';

const jobListings = [
  {
    company: "Boxy",
    title: "Graphic Designer",
    location: "Jakarta",
    type: "Full-time",
    experience: "3+ years",
    salary: "$300/ month",
    logo: "https://res.cloudinary.com/ddpegoqtf/image/upload/v1739442195/whatsapp_bpdxoz.png",
  },
  {
    company: "Comandor",
    title: "Product Designer",
    location: "Jakarta",
    type: "Internship",
    experience: "3+ years",
    salary: "$300/ month",
    logo: "https://res.cloudinary.com/ddpegoqtf/image/upload/v1739442195/netflix_a7n2bk.png",
  },
  {
    company: "Exodus",
    title: "UX Writer",
    location: "Jakarta",
    type: "Freelance",
    experience: "3+ years",
    salary: "$300/ month",
    logo: "https://res.cloudinary.com/ddpegoqtf/image/upload/v1739442195/pinterest_tcoae0.png",
  },
  {
    company: "Onion.co",
    title: "Senior UI Designer",
    location: "Jakarta",
    type: "Volunteer",
    experience: "3+ years",
    salary: "$300/ month",
    logo: "https://res.cloudinary.com/ddpegoqtf/image/upload/v1739442195/tiktok_pgocya.png",
  },
  {
    company: "Alair",
    title: "Researcher UX",
    location: "Jakarta",
    type: "Full-time",
    experience: "5+ years",
    salary: "$1100/ month",
    logo: "https://res.cloudinary.com/ddpegoqtf/image/upload/v1739442195/linkedin_huhg13.png",
  },
  {
    company: "ShinyStar",
    title: "UX Designer",
    location: "Jakarta",
    type: "Full-time",
    experience: "13+ years",
    salary: "$1300/ month",
    logo: "https://res.cloudinary.com/ddpegoqtf/image/upload/v1738650152/Meta_Logo_jvpupf.png",
  },
  {
    company: "ShinyStar",
    title: "UX Designer",
    location: "Jakarta",
    type: "Full-time",
    experience: "13+ years",
    salary: "$1300/ month",
    logo: "https://res.cloudinary.com/ddpegoqtf/image/upload/v1738650152/Meta_Logo_jvpupf.png",
  },
  {
    company: "ShinyStar",
    title: "UX Designer",
    location: "Jakarta",
    type: "Full-time",
    experience: "13+ years",
    salary: "$1300/ month",
    logo: "https://res.cloudinary.com/ddpegoqtf/image/upload/v1738650152/Meta_Logo_jvpupf.png",
  },
];

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

  const navigate = useNavigate();

  const [isHidden, setIsHidden] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(jobListings.length / PAGE_SIZE);


  const handleCompleteProfile = () =>{
    setIsHidden(!isHidden);
    navigate('/jobseeker/complete-profile-form/personal-info');  
  }

  const paginatedJobs = jobListings.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="py-6 px-1 md:px-6 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-2xl font-bold">
          {jobListings.length} job results
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
        <div
          className="absolute top-[10%] md:top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
              bg-white shadow-lg rounded-lg p-4 flex flex-col items-center w-80 z-20"
        >
          {/* Profile Icon */}
          <div className="bg-blue-300 p-3 rounded-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
            <LuFileUser className="h-10 w-10 text-white"/>
          </div>

          {/* Text */}
          <p className="text-center text-black font-semibold mt-2">
            Please Complete Your Profile To View and Apply For Jobs
          </p>

          {/* Button */}
          <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mt-3 flex items-center" onClick={()=> handleCompleteProfile()}>
            Complete My Profile
            <FaAnglesRight className="h-5 w-5 ml-2"/>
          </button>
        </div>

        {/* Job Cards (Behind Red Box) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          {paginatedJobs.map((job, index) =>
            isHidden ? (
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
