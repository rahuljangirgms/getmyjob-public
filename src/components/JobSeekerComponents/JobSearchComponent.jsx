import { useEffect, useState } from "react"
import Dropdown from "react-dropdown"
import "react-dropdown/style.css"
import { FiSearch, FiMapPin, FiBriefcase, FiChevronRight } from "react-icons/fi"
import {filterJobsRequest} from './../../store/slices/jobSeeker/job_Filter/jobFilterSlice';
import { useDispatch } from 'react-redux';


export default function JobSearchComponent() {

  const dispatch = useDispatch();

  const [jobTitle, setJobTitle] = useState('');

  const [workLocation, setWorkLocation] = useState('');

  const handleSearch = () =>{
    dispatch(filterJobsRequest({
      jobTitle,
      workLocation
    }));
  };

  const experienceOptions = ["Entry Level", "Mid Level", "Senior Level"]

  const defaultOption = experienceOptions[0]

  return (
    <div className="blue-700 bg-opacity-5">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-500 p-6 px-12">
        <h1 className="text-white text-4xl font-bold mb-8">Let's find your dream job!</h1>

        <div className="flex flex-col md:flex-row gap-4 w-full mx-auto">
          {/* Job Title Search */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-3.5 text-white w-5 h-5" />
            <input
              type="text"
              placeholder="Find job title"
              className="w-full pl-10 pr-4 py-3 rounded-full bg-blue-50 bg-opacity-20 text-white placeholder-white  focus:outline-none focus:ring-2 focus:ring-white"
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>

          {/* Location Search */}
          <div className="relative md:w-64">
            <FiMapPin className="absolute left-3 top-3.5 text-white w-5 h-5" />
            <input
              type="text"
              placeholder="Country/City"
              className="w-full pl-10 pr-4 py-3 rounded-full bg-blue-50 bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
              onChange={(e) => setWorkLocation(e.target.value)}
            />
          </div>

          {/* Experience Level Dropdown */}
          <div className="relative md:w-64 rounded-full">
            <FiBriefcase className="absolute left-3 top-3.5 text-white w-5 h-5 z-10" />
            <Dropdown
              options={experienceOptions}
              value={defaultOption}
              placeholder="Level/experience"
              className="experience-dropdown"
              controlClassName="!w-full !pl-10 !pr-4 !py-3 !rounded-full !bg-blue-50 !bg-opacity-20 !text-white !border-none !shadow-none"
              menuClassName="!bg-white !rounded-lg !mt-1 !border-none !shadow-lg"
              arrowClassName="!text-white h-6 w-6"
            />
          </div>

          {/* Search Button */}
          <button className="bg-white text-[#1a52e8] px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors flex items-center gap-2 justify-end md:justify-start"
            onClick={() => handleSearch()}
          >
            Search
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Related Tags */}
        <div className="flex gap-4 mt-6 text-white max-w-6xl mx-auto flex-wrap">
          <span className="text-gray-300 font-semibold">Related:</span>
          {["UI design", "Web design", "Graphic designer", "User interface"].map((tag) => (
            <span key={tag} className="hover:text-gray-300 cursor-pointer transition-colors">
              {tag}
            </span>  
          ))}
        </div>
      </div>

      {/* Custom CSS for Dropdown */}
      <style jsx global>{`
        .experience-dropdown .Dropdown-option {
          padding: 12px 16px;
          color: #4a5568;
        }
        .experience-dropdown .Dropdown-option:hover {
          background-color: #f7fafc;
        }
        .experience-dropdown .Dropdown-option.is-selected {
          background-color: #ebf4ff;
          color: #1a52e8;
        }
        .experience-dropdown .Dropdown-arrow {
          top: 20px;
          right: 16px;
        }
      `}</style>
    </div>
  )
}

