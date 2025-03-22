import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";

function ExperienceDetailsDisplay({ title, data, onDelete, onEdit }) {
  

  function formatDate(dateString) {
    if (!dateString) return "";
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  if (!data) return <p className="text-gray-500">No data submitted yet.</p>;

  return (
    <div className="flex flex-col justify-between items-center mb-4 rounded-lg bg-white p-6 shadow-md w-full border border-gray-200">
      
      {/* Header Section */}
      <div className="flex w-full border-b border-gray-300 items-center justify-between py-3">
        <p className="text-lg font-bold text-gray-800">{title}</p>
        <div className="flex gap-3">
          <button
            type="button"
            className="text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2"
            onClick={onEdit}
          >
            <MdOutlineEdit size={18} />
          </button>
          <button
            type="button"
            className="text-red-600 border border-red-600 hover:bg-red-600 hover:text-white focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2"
            onClick={() => onDelete()}
          >
            <RiDeleteBinLine size={18} />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full py-4 space-y-2">
        {data.designation && (
          <p className="text-gray-700 text-base">
            <span className="font-semibold text-gray-800">Designation:</span> {data.designation}
          </p>
        )}

        {data.enrollmentNumber && (
          <p className="text-gray-700 text-base">
            <span className="font-semibold text-gray-800">Enrollment Number:</span> {data.enrollmentNumber}
          </p>
        )}

        {data.validUpto && (
          <p className="text-gray-700 text-base">
            <span className="font-semibold text-gray-800">Valid Upto:</span> {formatDate(data.validUpto)}
          </p>
        )}

        {data.marksType && data.aggregate != 0 && data.max != 0 && (
          <p className="text-gray-700 text-base">
            <span className="font-semibold text-gray-800">{data.marksType.toUpperCase()}Marks:</span> {data.aggregate} / {data.max}
          </p>
        )}

        {data.provider && (
          <p className="text-gray-700 text-base">
            <span className="font-semibold text-gray-800">Provider:</span> {data.provider}
          </p>
        )}

        {data.publicationDate && (
          <p className="text-gray-700 text-base">
            <span className="font-semibold text-gray-800">Published On:</span> {formatDate(data.publicationDate)}
          </p>
        )}

        {data.type && (
          <p className="text-gray-700 text-base">
            <span className="font-semibold text-gray-800">Publication Type:</span> {data.type}
          </p>
        )}

        {data.from && (
          <p className="text-gray-700 text-base">
            <span className="font-semibold text-gray-800">Duration:</span> {formatDate(data.from)} - {data.to ? formatDate(data.to) : "Currently Working"}
          </p>
        )}

        {data.projectLink && (
          <a
            href={data.projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-medium underline"
          >
            {data.projectLink}
          </a>
        )}

        {data.industrySector && (
          <p className="text-gray-700 text-base">
            <span className="font-semibold text-gray-800">Industry Sector:</span> {data.industrySector}
          </p>
        )}

        {data.department && (
          <p className="text-gray-700 text-base">
            <span className="font-semibold text-gray-800">Department:</span> {data.department}
          </p>
        )}

        {data.ctc && (
          <p className="text-gray-700 text-base">
            <span className="font-semibold text-gray-800">CTC (in INR):</span> {data.ctc}
          </p>
        )}

        {data.stipend && (
          <p className="text-gray-700 text-base">
            <span className="font-semibold text-gray-800">Stipend (in INR):</span> {data.stipend}
          </p>
        )}

        {data.city && data.state && data.country && (
          <p className="text-gray-700 text-base">
            <span className="font-semibold text-gray-800">Location:</span> {data.city}, {data.state}, {data.country}
          </p>
        )}

        {data.instituteName && (
          <p className="text-gray-700 text-base">
            <span className="font-semibold text-gray-800">Institute Name:</span> {data.instituteName}
          </p>
        )}

        {data.skills && data.skills.length > 0 && (
          <div className="mt-3">
            <p className="font-semibold text-gray-800">Key Skills:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {data.skills.map((skill, index) => (
                <span key={index} className="px-4 py-1 bg-blue-100 text-sm rounded-full font-medium text-blue-700">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.mentor && (
          <p className="text-gray-700 text-base">
            <span className="font-semibold text-gray-800">Mentor:</span> {data.mentor}
          </p>
        )}

        {data.authorsCount && (
          <p className="text-gray-700 text-base">
            <span className="font-semibold text-gray-800">Authors:</span> {data.authorsCount}
          </p>
        )}

        {data.publicationName && (
          <p className="text-gray-700 text-base">
            <span className="font-semibold text-gray-800">Publication Name:</span> {data.publicationName}
          </p>
        )}

        {/* Research paper Publication Status */}

        {data.status && (
            <p className="text-gray-700 text-base">
            <span className="font-semibold text-gray-800">Publication Status:</span> {data.status}
          </p>
        )

        }

        {data.description && (
          <p className="text-gray-700 text-base">
            <span className="font-semibold text-gray-800">Description:</span> {data.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default ExperienceDetailsDisplay;
