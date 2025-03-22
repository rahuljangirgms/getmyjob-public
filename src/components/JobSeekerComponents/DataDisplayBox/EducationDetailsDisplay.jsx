import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";

function EducationDetailsDisplay({ title, data, onDelete, onEdit }) {
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
        {data.college && (
          <p className="text-gray-700 text-base break-words">
            <span className="font-semibold text-gray-800">College / School:</span> {data.college}
          </p>
        )}

        {data.joiningYear && data.completionYear && (
          <p className="text-gray-700 text-base">
            <span className="font-semibold text-gray-800">Duration:</span> {data.joiningYear} - {data.completionYear}
          </p>
        )}

        {data.stream && (
          <p className="text-gray-700 text-base">
            <span className="font-semibold text-gray-800">Stream:</span> {data.stream}
          </p>
        )}

        {data.aggregateType && (
          <p className="text-gray-700 text-base">
            <span className="font-semibold text-gray-800">Aggregate Type:</span> {data.aggregateType}
          </p>
        )}

        {data.aggregate && data.max && (
          <p className="text-gray-700 text-base">
            <span className="font-semibold text-gray-800">Marks:</span> {data.aggregate} 
            {data.aggregateType === "percentage" ? "%" : ` / ${data.max}`}
          </p>
        )}

        {data.activeBacklogs > 0 && (
          <p className="text-gray-700 text-base">
            <span className="font-semibold text-gray-800">Active Backlogs:</span> {data.activeBacklogs}
          </p>
        )}
      </div>
    </div>
  );
}

export default EducationDetailsDisplay;
