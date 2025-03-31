import React, { useEffect, useState } from "react";

import {
  Briefcase,
  Building2,
  Mail,
  FileCode2,
  BookmarkPlus,
  Wallet,
} from "lucide-react";

import AIButton from "./../../components/JobSeekerComponents/Buttons/AIButton";

const ApplyForJobPage = () => {
  const [selectedValue, setSelectedValue] = useState("option1"); // ✅ State to track selected radio

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

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
            <AIButton btnTxt={"Prepare for this Job"} />
            {/* <button className="px-6 py-2 border rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors">
              Apply
            </button> */}
          </div>
        </div>

        {/* Main Content & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mt-6">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Job */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Answer Below Questions
              </h2>

              <p class="font-medium text-gray-900 dark:text-white py-4">
                1. Are You Willing To Relocate ?
              </p>

              <div className="flex items-center mb-4">
                <input
                  id="radio-1"
                  type="radio"
                  name="radio-group"
                  value="option1"
                  checked={selectedValue === "option1"} // ✅ React handles checked state
                  onChange={handleChange} // ✅ Handle selection change
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="radio-1"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Yes
                </label>
              </div>

              {/* ✅ Radio Button 2 */}
              <div className="flex items-center">
                <input
                  id="radio-2"
                  type="radio"
                  name="radio-group"
                  value="option2"
                  checked={selectedValue === "option2"} // ✅ React handles checked state
                  onChange={handleChange} // ✅ Handle selection change
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="radio-2"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  No
                </label>
              </div>
            </div>

            <button className="px-6 py-2 border rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors">
              Submit my Application
            </button>

            {/* Responsibilities */}
            {/* <div className="bg-white rounded-xl shadow-sm p-6">
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
            </div> */}

            {/* Skills Section */}
            {/* <div className="bg-white rounded-xl shadow-sm p-6">
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
            </div> */}

            {/* About Company Section */}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Details */}
            {/* <div className="bg-white rounded-xl shadow-sm p-6">
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
            </div> */}

            {/* Latest Jobs */}
            {/* <div className="bg-white rounded-xl shadow-sm p-6">
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyForJobPage;
