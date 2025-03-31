import React, { useEffect, useState } from "react";

import AIButton from "./../../components/JobSeekerComponents/Buttons/AIButton";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  getJobDetailsRequest,
  getJobRoundsRequest,
} from "./../../store/slices/jobSeeker/job_List/jobListSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Briefcase,
  Building2,
  Mail,
  FileCode2,
  BookmarkPlus,
  Wallet,
} from "lucide-react";
import JobDetailSkeloton from "./../../components/JobSeekerComponents/ReusableComponents/JobDetailSkeloton";
import { toast, ToastContainer } from "react-toastify";
import ApplyJobModal from "./../../components/JobSeekerComponents/Job_Application/ApplyJobModal";
import { clearJobApplyStatus } from "./../../store/slices/jobSeeker/Job_Apply/jobApplySlice";
import { CircleUser } from "lucide-react";

const JobDetailsPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id, bash_id } = useParams();

  useEffect(() => {
    dispatch(getJobDetailsRequest({ id, bash_id }));
    dispatch(getJobRoundsRequest({ id, bash_id }));
  }, [dispatch]);

  // Job Details State

  const { loading, jobDetails, interViewRounds } = useSelector(
    (state) => state.jobSeekerJobList
  );

  // console.log("JOB Details frm API: ", jobDetails);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle Apply Button Below

  const handleApplyBtn = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Job Applied State

  const { message, success } = useSelector((state) => state.jobSeekerJobApply);

  useEffect(() => {
    if (message) {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        className: "bg-green-50 text-green-700",
      });
      dispatch(clearJobApplyStatus());
    }
    if (success) {
      setIsModalOpen(!isModalOpen);
    }
  }, [message]);

  return (
    <div className="min-h-screen bg-gray-50 my-20">
      <ToastContainer />
      {/* Job Header Banner */}
      {loading ? (
        <JobDetailSkeloton />
      ) : (
        <div>
          <div className="h-44 bg-gradient-to-r from-blue-200 to-blue-400"></div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
            {/* Job Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row md:items-start">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img
                    src={jobDetails?.company_logo}
                    alt="Microsoft"
                    className="w-10 h-10"
                  />
                </div>
                <div>
                  <h1 className="text-sm md:text-2xl font-semibold text-gray-900">
                    {jobDetails?.job_title}
                  </h1>
                  <p className="text-xs md:text-sm text-gray-800 mt-1">
                    {jobDetails?.company_name} •{" "}
                    <span>
                      {jobDetails?.job_locations?.map((location, index) => (
                        <span key={index}>
                          {location}
                          {index !== jobDetails.job_locations.length - 1 &&
                            ", "}
                        </span>
                      ))}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex mt-4 md:mt-0 md:ml-auto space-x-2 gap-2 md:gap-0 flex-col md:flex-row">
                <button className="flex items-center px-4 py-2 border rounded-lg text-sm font-medium text-gray-800 bg-white hover:bg-gray-100 transition-colors">
                  <BookmarkPlus className="mr-2 w-4 h-4" /> Save
                </button>
                <AIButton btnTxt={"Generate Resume By Job Description"} />
                <button
                  className="px-6 py-2 border rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors"
                  onClick={() => handleApplyBtn()}
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Main Content & Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              {/* Left Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* About Job */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    About the job
                  </h2>
                  <p
                    className="text-gray-800"
                    dangerouslySetInnerHTML={{
                      __html: jobDetails?.job_description,
                    }}
                  ></p>
                </div>

                {/* Responsibilities */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Responsibilities
                  </h2>

                  <div
                    style={{ listStyle: "inherit" }}
                    className="prose custom prose-sm max-w-none text-gray-800 px-6"
                    dangerouslySetInnerHTML={{
                      __html: jobDetails?.responsibilities,
                    }}
                  />
                </div>

                {/* Skills Section */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {jobDetails?.skills_required.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* About Company Section */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    About Company
                  </h2>
                  <div className="flex items-center space-x-3">
                    <img
                      src={jobDetails?.company_logo}
                      className="w-12 h-12 rounded-lg"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">
                        {jobDetails?.company_name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        14,056,752 followers
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-800">
                    {jobDetails?.company_description}
                  </p>

                  {/* Latest Activity */}
                  <div className="bg-gray-100 mt-4 p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Latest activity
                    </h3>
                    <div className="flex items-center mt-3">
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">
                          {jobDetails?.company_name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          How do I cancel my reservation for a stay?
                        </p>
                        <p className="text-xs text-gray-500">
                          You can cancel a reservation any time before or during
                          your trip.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Job Details */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Job Details
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center text-gray-800">
                      <CircleUser className="w-5 h-5 mr-3 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {jobDetails?.experience_required}
                        </p>
                        <p className="text-sm text-gray-800">
                          Experience Required
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-800">
                      <Briefcase className="w-5 h-5 mr-3 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {jobDetails?.job_type}
                        </p>
                        <p className="text-sm text-gray-800">Employment Type</p>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-800">
                      <Wallet className="w-5 h-5 mr-3 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Salary
                        </p>
                        <p className="text-sm text-gray-800">
                          {jobDetails?.salary_range} Rs
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-800">
                      <Building2 className="w-5 h-5 mr-3 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {jobDetails?.industry?.map((ind, index) => (
                            <span key={index}>
                              {ind}
                              {index !== jobDetails.industry.length - 1 && ", "}
                            </span>
                          ))}
                        </p>

                        <p className="text-sm text-gray-800">Industry</p>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-800">
                      <Mail className="w-5 h-5 mr-3 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {jobDetails?.contact_email}
                        </p>
                        <p className="text-sm text-gray-800">Contact Email</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Latest Jobs */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Interview Rounds
                  </h2>
                  <div className="space-y-4">
                    {interViewRounds.map((job, index) => (
                      <div key={job.interview_round_id} className="group">
                        <div className="block bg-gray-100  hover:bg-gray-50 p-3 rounded-lg transition-colors">
                          <h3 className="text-sm font-medium text-gray-900">
                            {job.round_name}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isModalOpen && (
            <ApplyJobModal
              onClose={() => setIsModalOpen(false)}
              id={id}
              bash_id={bash_id}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default JobDetailsPage;
