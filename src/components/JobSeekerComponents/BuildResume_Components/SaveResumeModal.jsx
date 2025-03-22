import React, { useState } from "react";
import { toast } from 'react-toastify';


function SaveResumeModal({ onSave, onClose }) {
  const [resumeName, setResumeName] = useState("");

  const handleSave = () => {
    if (resumeName.trim() === "") {
      toast.error("Please provide a name for your resume");
      return;
    }
    onSave(resumeName);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Save Your Resume</h2>
        <div className="mb-4">
          <label htmlFor="resumeName" className="block text-gray-700 mb-2">
            Resume Name
          </label>
          <input
            id="resumeName"
            type="text"
            value={resumeName}
            onChange={(e) => setResumeName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter resume name"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className=
            "text-white bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default SaveResumeModal;
