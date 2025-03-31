import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import { SlFire } from "react-icons/sl";
import { BsFire } from "react-icons/bs";
import companyImg from "./../../assets/images/Comapny_building.png";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/jobseeker/job-detail/${id}/${job.bash_id}`); // Navigates to the Job Details page with job ID
  };
  return (
    <div
      className="border rounded-lg p-4 bg-white relative overflow-hidden cursor-pointer transition-opacity duration-300 z-0 shadow-xl"
      onClick={() => handleClick(job.id)}
    >
      <div className="border-b-2 border-gray-200 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1 h-12 w-12 rounded-md flex justify-center items-center overflow-hidden">
            <img
              //companyImg
              src={job.company_logo}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-gray-700">{job.company_name}</p>
            <h3 className="text-lg font-semibold">{job.job_title}</h3>
          </div>
        </div>
        <BsBookmark className="text-gray-500 cursor-pointer absolute top-4 right-4" />

        <div className="flex items-center text-sm text-gray-500 mt-3 justify-between">
          <div className="flex flex-row items-center flex-wrap text-sm text-gray-700">
            <FaMapMarkerAlt size={16} className="mr-1 text-red-500" />
            {job.job_locations.map((location, index) => (
              <span key={index}>
                {location}
                {index !== job.job_locations.length - 1 && ","}&nbsp;  
              </span>
            ))}
          </div>

          {job.is_hot_job === "Yes" && (
            <div>
              <span className="bg-orange-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full border border-orange-400 flex flex-row items-center gap-1">
                <BsFire />
                Hot Job
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-2 text-sm">
        <span className="bg-blue-50 px-2 py-1 rounded-full font-semibold text-blue-600">
          {job.job_type}
        </span>
        <span className="bg-blue-50 px-2 py-1 rounded-full font-semibold text-blue-600">
          {job.experience_required}
        </span>
        <span className="bg-blue-50 px-2 py-1 rounded-full font-semibold text-blue-600">
          {job.salary_range} $
        </span>
      </div>
      <p
        className="py-3 text-gray-500 font-normal text-sm"
        dangerouslySetInnerHTML={{ __html: job.job_description.slice(0,50)+"..." }}
      ></p>
    </div>
  );
};

export default JobCard;
