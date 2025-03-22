import React from "react";

import AIButton from "./../../components/JobSeekerComponents/Buttons/AIButton";

import { useNavigate } from 'react-router-dom';

import {
  Briefcase,
  Building2,
  Mail,
  FileCode2,
  BookmarkPlus,
  Wallet,
} from "lucide-react";  



const JobDetailsPage = () => {

  const navigate = useNavigate();

  const handleApplyBtn = () =>{
    navigate('/jobseeker/apply-job');
  }


  const skills = ["Business", "Marketing", "Development"];
  const latestJobs = [
    {
      title: "Crisis Intervention Specialist",
      location: "London",
      company: "Microsoft Inc.",
    },
    {
      title: "Virtual Scheduler",
      location: "New York",
      company: "Microsoft Inc.",
    },
    {
      title: "Patient Care Advocate",
      location: "Washington",
      company: "Microsoft Inc.",
    },
    {
      title: "Medical Assistant Instructor",
      location: "Atlanta",
      company: "Microsoft Inc.",
    },
    {
      title: "Crisis Intervention Specialist",
      location: "London",
      company: "Microsoft Inc.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 my-20">
      {/* Job Header Banner */}
      <div className="h-44 bg-gradient-to-r from-orange-400 to-green-400"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        {/* Job Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row md:items-start">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/ddpegoqtf/image/upload/v1739873441/images_ixyyvv.png"
                alt="Microsoft"
                className="w-10 h-10"
              />
            </div>
            <div>
              <h1 className="text-sm md:text-2xl font-semibold text-gray-900">
                Associate Project Manager
              </h1>
              <p className="text-xs md:text-sm text-gray-800 mt-1">
                Microsoft Inc. • Los Angeles, USA • 14 hours ago
              </p>
            </div>
          </div>

          <div className="flex mt-4 md:mt-0 md:ml-auto space-x-2 gap-2 md:gap-0 flex-col md:flex-row">
            <button className="flex items-center px-4 py-2 border rounded-lg text-sm font-medium text-gray-800 bg-white hover:bg-gray-100 transition-colors">
              <BookmarkPlus className="mr-2 w-4 h-4" /> Save
            </button>
            <AIButton btnTxt={"Generate Resume By Job Description"} />
            <button className="px-6 py-2 border rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors"
            onClick={()=> handleApplyBtn()}
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
              <p className="text-gray-800">
                Microsoft is an equal opportunity employer. All qualified
                applicants will receive consideration for employment without
                regard to age, ancestry, color, family or medical care leave,
                gender identity or expression, genetic information, marital
                status, medical condition, national origin, physical or mental
                disability, political affiliation, protected veteran status,
                race, religion.
              </p>
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Responsibilities
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-800">
                <li>
                  Deliver the project or solution as per the baseline scope.
                </li>
                <li>
                  Cost & Ensure high-quality delivery without any escalations.
                </li>
                <li>Maintain high team & customer satisfaction levels.</li>
                <li>Ensure high-quality delivery without any escalations.</li>
              </ul>
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
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
                  src="https://res.cloudinary.com/ddpegoqtf/image/upload/v1739873441/images_ixyyvv.png"
                  alt="Microsoft"
                  className="w-12 h-12 rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold">Microsoft</h3>
                  <p className="text-sm text-gray-600">14,056,752 followers</p>
                </div>
              </div>
              <p className="mt-3 text-gray-800">
                All qualified applicants will receive consideration for
                employment without regard to age, ancestry, color, family or
                medical care leave, gender identity or expression, genetic
                information, marital status, medical condition.
              </p>

              {/* Latest Activity */}
              <div className="bg-gray-100 mt-4 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">
                  Latest activity
                </h3>
                <div className="flex items-center mt-3">
                  <img
                    src="https://res.cloudinary.com/ddpegoqtf/image/upload/v1739873441/images_ixyyvv.png"
                    alt="Microsoft"
                    className="w-8 h-8 rounded-lg"
                  />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">
                      Microsoft Inc.
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
                  <Briefcase className="w-5 h-5 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Full-time
                    </p>
                    <p className="text-sm text-gray-800">Employment Type</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-800">
                  <Wallet className="w-5 h-5 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Salary</p>
                    <p className="text-sm text-gray-800">$500 Per Month</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-800">
                  <Building2 className="w-5 h-5 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Software and hardware
                    </p>
                    <p className="text-sm text-gray-800">Industry</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-800">
                  <FileCode2 className="w-5 h-5 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Information technology
                    </p>
                    <p className="text-sm text-gray-800">Job Function</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-800">
                  <Mail className="w-5 h-5 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      jobs@microsoft.com
                    </p>
                    <p className="text-sm text-gray-800">Contact Email</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Latest Jobs */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Latest jobs
              </h2>
              <div className="space-y-4">
                {latestJobs.map((job, index) => (
                  <div key={index} className="group">
                    <a
                      href="#"
                      className="block bg-gray-100  hover:bg-gray-50 p-3 rounded-lg transition-colors"
                    >
                      <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-800 mt-1">
                        {job.company} • {job.location}
                      </p>
                    </a>
                  </div>
                ))}
                <a
                  href="#"
                  className="block text-sm font-medium text-blue-600 hover:text-blue-700 mt-4"
                >
                  See all jobs from Microsoft
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
