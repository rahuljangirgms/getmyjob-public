import React, { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import {filterJobsRequest} from './../../store/slices/jobSeeker/job_Filter/jobFilterSlice';

function JobFilterComponent() {
  const [sortBy, setSortBy] = useState("");
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState([0, 0]);
  const [workLocation, setWorkLocation] = useState(""); 
  const [showFilters, setShowFilters] = useState(false);


  const dispatch = useDispatch();

  useEffect(() => {
    // Only send API request if user has interacted
    if (sortBy || jobType || salary[0] !== 0 || salary[1] !== 0 || workLocation) {
      dispatch(
        filterJobsRequest({
          sortBy,
          jobType,
          salaryRange: salary,
          workLocation,
        })
      );
    }
  }, [sortBy, jobType, salary, workLocation, dispatch]);




  return (
    <div>
      {/* Mobile Filter Button */}
      <div className="md:hidden flex justify-end my-4">
       {
        !showFilters && (
            <button
            type="button"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-full text-sm px-5 py-2.5 text-center flex justify-center items-center"
            onClick={() => setShowFilters(!showFilters)}
          >
          <IoFilter size={18} className="text-white mx-2"/>
            Filter Jobs
          </button>
        )
       }
        {/* <button
            type="button"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-full text-sm px-5 py-2.5 text-center flex justify-center items-center"
            onClick={() => setShowFilters(!showFilters)}
          >
          <IoFilter size={18} className="text-white mx-2"/>
            Filter Jobs
          </button> */}
      </div>
      
      {/* Filter Section */}
      <div className={`w-full max-w-md mx-auto bg-white rounded-3xl p-6 space-y-1 border-2 border-gray-200 ${showFilters ? "block" : "hidden"} md:block`}>
        {/* Sort By */}
        <div>
        <div className="flex flex-row justify-end">
        {/* <h3 className="text-md font-medium text-gray-700">Sort by</h3> */}
        {showFilters ? 
            <AiOutlineClose size={25} className="text-red-600 cursor-pointer " onClick={() => setShowFilters(!showFilters)}/> : null
        }
        </div>
        

          {/* <div className="flex gap-2 border-b-2 border-gray-200 py-4">
            <button
              onClick={() => setSortBy("Oldest")}
              className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 border ${
                sortBy === "relevancy"
                  ? "bg-blue-100 text-blue-700 border-blue-700 font-medium"
                  : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
              }`}
            >
              Relevancy
            </button>
            <button
              onClick={() => setSortBy("newest")}
              className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 border ${
                sortBy === "newest"
                  ? "bg-blue-100 text-blue-700 border-blue-700 font-medium"
                  : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
              }`}
            >
              Newest
            </button>
          </div> */}
        </div>
        
        {/* Job Type */}
        <div>
          <h3 className="text-md font-medium text-gray-700">Job type</h3>
          <div className="space-y-2 border-b-2 border-gray-200 py-4">
            {["full-time", "internship", "freelance", "volunteer"].map((type) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="jobType"
                  value={type}
                  checked={jobType === type}
                  onChange={(e) => setJobType(e.target.value)}
                  className="hidden"
                />
                <div
                  className={`w-5 h-5 flex items-center justify-center border-2 rounded-full transition-all ${
                    jobType === type ? "border-blue-700" : "border-gray-200 hover:border-gray-500"
                  }`}
                >
                  {jobType === type && <div className="w-3 h-3 bg-blue-700 rounded-full"></div>}
                </div>
                <span className="text-sm text-gray-600 capitalize">{type.split("-").join(" ")}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Salary range section */}
        <div>
          <h3 className="text-md font-medium text-gray-700">Salary</h3>
          <div className="px-2 border-b-2 border-gray-200 py-4">
            <div className="text-accent text-sm mb-2 font-semibold">
              ₹ {salary[0]} Lakhs - ₹ {salary[1]} Lakhs
            </div>
            <input
              type="range"
              min="1"
              max="25"
              value={salary[1]}
              onChange={(e) => setSalary([salary[0], parseInt(e.target.value)])}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
            />
          </div>
        </div>
        
        {/* Work Location */}
        <div className="space-y-3">
          <h3 className="text-md font-medium text-gray-700">On-site/remote</h3>
          <div className="space-y-2">
            {["remote", "on-site", "hybrid"].map((location) => (
              <label key={location} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="workLocation"
                  value={location}
                  checked={workLocation === location}
                  onChange={(e) => setWorkLocation(e.target.value)}
                  className="hidden"
                />
                <div
                  className={`w-5 h-5 flex items-center justify-center border-2 rounded-full transition-all ${
                    workLocation === location ? "border-blue-700" : "border-gray-200 hover:border-gray-500"
                  }`}
                >
                  {workLocation === location && <div className="w-3 h-3 bg-blue-700 rounded-full"></div>}
                </div>
                <span className="text-sm text-gray-600 capitalize">{location.split("-").join(" ")}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobFilterComponent;
