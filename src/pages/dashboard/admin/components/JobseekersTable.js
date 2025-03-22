import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "flowbite";
import "flowbite";
import StatusBadge from "../components/statusbadge";
import ProfileCompletionBar from "../components/profilecompletionbar";


const JobseekersTable = ({ data }) => {
  const [selectedJobseekers, setSelectedJobseekers] = useState([]);
  const [jobseekersData, setJobseekersData] = useState(data);
  const [bulkModalVisible, setBulkModalVisible] = useState(false);
  const [bulkAction, setBulkAction] = useState(null);
  useEffect(() => {
    document.querySelectorAll("[data-dropdown-toggle]").forEach((btn) => {
      const dropdownMenu = document.getElementById(btn.dataset.dropdownToggle);
      if (dropdownMenu) {
        new Dropdown(dropdownMenu, btn);
      }
    });
  }, [jobseekersData]);
  const toggleSelection = (id) => {
    setSelectedJobseekers((prev) =>
      prev.includes(id) ? prev.filter((jobseekerId) => jobseekerId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedJobseekers(selectedJobseekers.length === jobseekersData.length ? [] : jobseekersData.map((j) => j.id));
  };

  const updateStatus = (status) => {
    setJobseekersData((prev) =>
      prev.map((jobseeker) =>
        selectedJobseekers.includes(jobseeker.id) ? { ...jobseeker, status } : jobseeker
      )
    );
    setSelectedJobseekers([]);
    setBulkModalVisible(false);
  };




  const handleAction = (action, id) => {
    setBulkAction(action === "enable" ? "Active" : "Inactive");
    setSelectedJobseekers([id]); // Set only the selected jobseeker
    setBulkModalVisible(true);
  };

  const confirmBulkAction = () => {
    updateStatus(bulkAction);
    setBulkModalVisible(false);
  };



  return (
    <div className="relative w-full h-[calc(80vh)] bg-white dark:bg-gray-800 ">
      {/* Bulk Actions & Import/Export */}
      <div className="flex justify-between items-center mb-4">
        <div
          className={`flex space-x-2 transition-opacity duration-300 ${selectedJobseekers.length > 0 ? "opacity-100" : "opacity-50 pointer-events-none"
            }`}
        >
          <button
            onClick={() => {
              setBulkAction("Active");
              setBulkModalVisible(true);
            }}
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
          >
            Enable selected
          </button>
          <button
            onClick={() => {
              setBulkAction("Inactive");
              setBulkModalVisible(true);
            }}
            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
          >
            Disable selected
          </button>
        </div>

        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Jobseekers List</h2>

        {/* <div className="flex items-center gap-2">
          <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700">
            Import
          </button>
          <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-900 dark:hover:bg-gray-700">
            Export
          </button>
        </div> */}
      </div>

      {/* Table */}
      <div className="overflow-auto max-h-[calc(98vh-250px)]">
        <table className="min-w-full divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700 sticky top-0 z-10">
            <tr>
              <th className="p-4 w-12 rounded-tl-3xl rounded-bl-3xl">
                <input
                  type="checkbox"
                  checked={selectedJobseekers.length === jobseekersData.length}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
              </th>
                  <th className="px-6 py-3 text-left w-44">Profile</th> 

              <th className="px-6 py-3 text-left w-56">Name</th>
              <th className="px-6 py-3 text-left w-72">Location</th>
              <th className="px-6 py-3 text-left w-80">Experience</th>
              <th className="px-6 py-3 text-left w-44">Job Title</th>
              <th className="px-6 py-3 text-left w-36">Status</th>
              <th className="px-6 py-3 text-left w-64">Profile </th>
              <th className="px-6 py-3 text-left w-44 rounded-tr-3xl rounded-br-3xl">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {jobseekersData.map((jobseeker) => (
              <tr key={jobseeker.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-3xl">
                <td className="p-4 rounded-tl-3xl rounded-bl-3xl">
                  <input
                    type="checkbox"
                    checked={selectedJobseekers.includes(jobseeker.id)}
                    onChange={() => toggleSelection(jobseeker.id)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                </td>
                  {/* Profile Image Column */}
      <td className="px-6 py-4">
        <img
          src={jobseeker.profileImage}
          alt={`${jobseeker.name} Profile`}
          className="w-12 h-12 rounded-full  bg-gray-200 dark:bg-gray-600 p-1"
        />
      </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {jobseeker.name}
                </td>
                <td className="px-6 py-4">{jobseeker.location}</td>
                <td className="px-6 py-4">{jobseeker.experience} Years</td>
                <td className="px-6 py-4">{jobseeker.jobTitle}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={jobseeker.status} />
                </td>
                <td className="px-6 py-4">
                  <ProfileCompletionBar percentage={jobseeker.completion} />
                </td>
                <td className="px-6 py-4 rounded-tr-3xl rounded-br-3xl">
                  {/* Flowbite Dropdown Button */}
                  <button
                    id={`dropdownButton-${jobseeker.id}`}
                    data-dropdown-toggle={`dropdownMenu-${jobseeker.id}`}

                    type="button"
                  >

                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  <div
                    id={`dropdownMenu-${jobseeker.id}`}
                    className="z-10 hidden bg-white divide-y border-2 dark:border-gray-500 divide-gray-100 rounded-lg shadow-xl w-44 dark:bg-gray-600"
                  >
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                      <li>
                        <button

                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white w-full text-left"
                        >
                          View Profile
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleAction("disable", jobseeker.id)}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white w-full text-left"
                        >
                          Disable
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleAction("enable", jobseeker.id)}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white w-full text-left"
                        >
                          Enable
                        </button>
                      </li>

                    </ul>
                  </div>
                  {/* End Dropdown Menu */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



      {/* Bulk Confirmation Modal */}

      {bulkModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 z-50">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700 p-6 text-center">

              {/* Close Button */}
              <button
                type="button"
                onClick={confirmBulkAction}
                className="absolute top-3 right-3 text-gray-400 bg-transparent bg-gray-200 hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg className="w-3 h-3" viewBox="0 0 14 14" fill="none">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>

              {/* Confirmation Icon */}
              <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" viewBox="0 0 20 20" fill="none">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              {/* Modal Title */}
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to <span className="font-bold">{bulkAction?.toLowerCase()}</span>{" "}
                {selectedJobseekers.length === 1 ? (
                  <span className="font-bold">{jobseekersData.find((j) => j.id === selectedJobseekers[0])?.name}</span>
                ) : (
                  "selected jobseekers"
                )}
                ?
              </h3>



              {/* Action Buttons */}
              <div className="flex justify-center space-x-3">
                <button
                  onClick={confirmBulkAction}
                  className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  No, Cancel
                </button>

                <button
                  onClick={() => updateStatus(bulkAction)}
                  className="py-2.5 px-5 text-sm font-medium text-white bg-red-600 hover:bg-red-800 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
                >
                  Yes, Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobseekersTable;
