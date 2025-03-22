import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";

function ExperienceDetailsDisplay({ title, data, onDelete,onEdit }) {
  console.log(data);

  function formatDate(dateString) {
    if (!dateString) return "";
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  if (!data) return <p className="text-gray-500">No data submitted yet.</p>;

  return (
    <div className="flex flex-col justify-between items-center mb-4 rounded-lg bg-white p-4 md:p-6 shadow-sm w-full">
      
      {/* Header Section */}
      <div className="flex w-full border-b-2 border-gray-300 items-center justify-between pb-2 md:pb-0">
        <p className="text-sm md:text-lg font-semibold py-2">{title}</p>
        <div className="flex gap-2">
          <button
            type="button"
            className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-xs md:text-sm p-2 text-center inline-flex items-center"
            onClick={onEdit}
          >
            <MdOutlineEdit size={16} />
          </button>
          <button
            type="button"
            className="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-xs md:text-sm p-2 text-center inline-flex items-center"
            onClick={() => onDelete()}
          >
            <RiDeleteBinLine size={16} />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex w-full py-2 flex-col bg-blue-50 mt-2 p-4 md:p-5 rounded-md text-sm md:text-base">
        
        {data.designation && (
          <p className="font-semibold text-gray-700">
            <span>Designation: </span> {data.designation}
          </p>
        )}

        {data.enrollmentNumber && (
          <p className="font-semibold text-gray-700">
            <span>Enrollment Number: </span> {data.enrollmentNumber}
          </p>
        )}

        {data.validUpto && (
          <p>
            <span className="text-blue-700 font-semibold">
              <span className="pe-2 text-gray-600">Valid Upto:</span>
              {formatDate(data.validUpto)}
            </span>
          </p>
        )}

        {data.marksType && data.aggregate && data.max && (
          <p>
            <span className="text-blue-700 font-semibold">
              <span className="pe-2 text-gray-600">
                {data.marksType.toUpperCase()}:
              </span>
              {data.aggregate} / {data.max}
            </span>
          </p>
        )}

        {data.provider && (
          <p>
            <span className="text-blue-700 font-semibold">
              <span className="pe-2 text-gray-600">Provider:</span>
              {data.provider}
            </span>
          </p>
        )}

        {data.publicationDate && (
          <p>
            <span className="text-blue-700 font-semibold">
              <span className="pe-2 text-gray-600">Published On,</span>
              {formatDate(data.publicationDate)}
            </span>
          </p>
        )}

        {data.mentor && (
          <p>
            <span className="text-blue-700 font-semibold">
              <span className="pe-2 text-gray-600">Mentor:</span>
              {data.mentor}
            </span>
          </p>
        )}

        {data.publicationName && (
          <p>
            <span className="text-blue-700 font-semibold">
              <span className="pe-2 text-gray-600">Publication Name:</span>
              {data.publicationName}
            </span>
          </p>
        )}

        {data.type && (
          <p>
            <span className="text-blue-700 font-semibold">
              <span className="pe-2 text-gray-600">Publication Type:</span>
              {data.type}
            </span>
          </p>
        )}

        {data.authorsCount && (
          <p>
            <span className="text-blue-700 font-semibold">
              <span className="pe-2 text-gray-600">Authors Count:</span>
              {data.authorsCount}
            </span>
          </p>
        )}

        {data.from && (
          <p>
            <span className="text-blue-700 font-semibold">
              {formatDate(data.from)}
            </span>{" "}
            -{" "}
            <span className="text-blue-700 font-semibold">
              {data.to ? formatDate(data.to) : "Currently Working"}
            </span>
          </p>
        )}

        {data.projectLink && (
          <a
            href={data.projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-semibold break-all"
          >
            {data.projectLink}
          </a>
        )}

        {data.industrySector && (
          <p>
            Industry Sector:{" "}
            <span className="text-blue-600 font-semibold">
              {data.industrySector}
            </span>
          </p>
        )}

        {data.department && (
          <p>
            Department:{" "}
            <span className="text-blue-600 font-semibold">
              {data.department}
            </span>
          </p>
        )}

        {data.ctc && (
          <p>
            CTC (in INR):{" "}
            <span className="font-semibold text-blue-600">{data.ctc}</span>
          </p>
        )}

        {data.stipend && (
          <p>
            Stipend (in INR):{" "}
            <span className="font-semibold text-blue-600">{data.stipend}</span>
          </p>
        )}

        {data.city && data.state && data.country && (
          <p>
            Location:{" "}
            <span className="font-semibold text-blue-600">
              {data.city}, {data.state}, {data.country}
            </span>
          </p>
        )}

        {data.instituteName && (
          <p>
            Institute Name:
            <span className="text-blue-600 ps-2 font-semibold">
              {data.instituteName}
            </span>
          </p>
        )}

        {data.skills && (
          <div className="flex flex-wrap mt-2">
            <p className="py-2 font-semibold text-gray-700 me-2 ">Key Skills:</p>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-200 text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.description && (
          <p>
            Description:{" "}
            <span className="text-blue-600 font-semibold">
              {data.description}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default ExperienceDetailsDisplay;
