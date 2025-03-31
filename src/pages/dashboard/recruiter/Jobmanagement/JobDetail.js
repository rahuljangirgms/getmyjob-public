// JobDetail.js
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobsRequest } from "../../../../store/slices/recruiter/jobSlice";
import { Folder, House, IndianRupee, Mail, Notebook, PersonStanding, User } from "lucide-react";
// If you have an icon library for the star icon, import it here.
// Example: import { Sparkles } from "lucide-react"; // or any star icon

const JobDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
   const { jobs = [], loading, filters = {} } = useSelector((state) => state.jobs);
console.log("jobs in detal",jobs)

  // Ensure jobs are loaded (if necessary)
  useEffect(() => {
    // Always fetch jobs on mount (no active/draft/expired check)
    dispatch(fetchJobsRequest());
  }, [dispatch]);

  // Combine all jobs into one array
  const allJobs = Array.isArray(jobs)
  ? jobs
  : [
      ...(jobs?.activeJobs || []),
      ...(jobs?.draftJobs || []),
      ...(jobs?.expiredJobs || []),
    ];

  // Find the job with matching id
  const job = allJobs.find((item) => String(item.id) === id);

  if (loading) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <Skeleton height={40} />
      </div>
    );
  }

  if (!jobs) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-2">Job not found</h2>
        <Link to="/recruiter/dashboard/jobs" className="text-blue-600 hover:underline">
          &larr; Back to Jobs List
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl h-full my-auto bg-white mx-auto">
      {/* Back to Jobs List */}
      <Link to="/recruiter/dashboard/jobs" className="text-blue-600 hover:underline inline-block mb-4 text-sm">
        &larr; Back to Jobs List
      </Link>

      {/* Header Row: Title + Buttons */}
      <div className="flex flex-col  sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-0">
          {job.job_title || "Associate Project Manager"}
        </h1>
      
      </div>

      {/* Sub-header: Company, Location, Time posted */}
      <div className="text-gray-500 text-sm mb-6">
        {job.company_name} &mdash; {job.location } &mdash;{" "}
        <span>  Posted on{" "}
  {job.created_at
    ? new Date(job.created_at).toLocaleDateString()
    : "N/A"}</span>
      </div>

      {/* Main Content: 2 columns */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column */}
        <div className="w-full rounded-xl border-solid border-gray-950 border-2 border-opacity-5  md:w-2/3 space-y-4">
          {/* About the job */}
          <div className=" p-4 rounded-md ">
            <h2 className="text-lg font-semibold mb-2">About the job</h2>
            <p className="text-sm text-gray-700">
              {/* Sample text. Replace with your own. */}
              <div
              className="text-sm text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: job.job_description }}
            />
            </p>
          </div>

          {/* Responsibilities */}
          <div className=" p-4 ">
            <h2 className="text-lg font-semibold mb-2">Responsibilities</h2>
            {/* We assume job.description has HTML bullet points, so we render with dangerouslySetInnerHTML */}
            <div
              className="text-sm text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: job.responsibilities }}
            />
          </div>

          {/* Skills */}
          <div className=" p-4 rounded-xl  ">
  <h2 className="text-lg font-semibold mb-2">Skills</h2>
  {/* If job.skills is an array, map over it */}
  <div className="flex flex-wrap gap-2">
    {Array.isArray(job.skills_required) && job.skills_required.map((skill, index) => (
      <span 
        key={index} 
        className="bg-slate-300 rounded-full px-3 py-1 text-sm text-gray-700"
      >
        {skill}
      </span>
    ))}
  </div>
</div>

        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/3 space-y-4">
          {/* Salary & Info */}
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <h3 className="text-xl font-bold mb-2 flex justify-start my-2">
            <span className="rounded-full p-2 border-gray-300 border-2 my-auto"><IndianRupee size={18}/></span>  <span className=" my-auto mx-2 font-medium text-start"> {job.salary_range || "₹ 0"}  <span className="text-sm text-gray-500 ml-2">Avg. salary</span></span> 
             
            </h3>
            <p className="text-sm text-gray-600 flex justify-start my-2 ">
            <span className="rounded-full p-2 border-gray-300 border-2 my-auto"><Folder size={18}/></span> <span className=" my-auto mx-2 font-medium text-start">{job.industry}</span> 
            </p>
            <p className="text-sm text-gray-600 flex justify-start my-2 ">
            <span className="rounded-full p-2 border-gray-300 border-2 my-auto"><House size={18}/></span> <span className=" my-auto mx-2 font-medium text-start"> {job.job_type || "Full-time"}</span>
            </p>
            <p className="text-sm text-gray-600 flex justify-start my-2 ">
            <span className="rounded-full p-2 border-gray-300 border-2 my-auto"><Notebook size={18}/></span> <span className=" my-auto mx-2 font-medium text-start"> {job.experience_required || "Experience"} Experience</span>
            </p>
            {/* <p className="text-sm text-gray-600 mb-1">
              {job.industries?.join(", ") || "Information technology"}
            </p> */}
            <p className="text-sm text-gray-600 flex justify-start my-2">

            <span className="rounded-full p-2 border-gray-300 border-2 my-auto"><Mail size={18}/></span> <span className=" my-auto mx-2 text-start font-medium">
              {job.contact_email || "jobs@microsoft.com"} </span>
            </p>
<br className="divide-solid divide-x divide-gray-700 "/>
            <div className="bg-gray-50  rounded-md my-10 ">
            <h3 className="text-xl font-bold mb-2">
             candidates 
             <p className="text-sm text-gray-600 flex justify-start my-2 ">
            <span className="rounded-full p-2 border-gray-300 border-2 my-auto"><User size={18}/></span> <span className=" my-auto mx-2 font-medium text-start">Applicants</span> 
            </p>
            </h3>
            </div>
          </div>

          {/* Placeholder or Additional Info */}
          {/* <div className="bg-gray-50 p-4 rounded-md shadow-sm text-sm text-gray-700">
            <p>
              My new car is sexy. I'm married to the job, ironically. 
          
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
