import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { deleteEducationalDetail } from "./../../store/slices/profileFormsSlice";
import { useDispatch } from "react-redux";
import EducationDetailsModal from "./EducationDetailsModal";



function EducationDetailsDisplay({ title, data }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);

  // Open modal with pre-filled data
  const handleEdit = () => {
    setSelectedEducation(data);
    setIsModalOpen(true);
  };

  if (!data) return <p className="text-gray-500">No data submitted yet.</p>;

  return (
    <div className="flex flex-col justify-between items-center mb-4 rounded-lg bg-white p-4 md:p-6 shadow-sm w-full">
      {/* Header Section */}
      <div className="flex w-full border-b-2 border-gray-300 items-center justify-between py-2">
        <p className="text-sm md:text-lg font-semibold py-2">{title}</p>
        <div className="flex gap-2">
          <button
            type="button"
            className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-xs md:text-sm p-2 text-center inline-flex items-center"
            onClick={handleEdit}
          >
            <MdOutlineEdit size={16} />
          </button>
          <button
            type="button"
            className="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-xs md:text-sm p-2 text-center inline-flex items-center"
            onClick={() => dispatch(deleteEducationalDetail({ title }))}
          >
            <RiDeleteBinLine size={16} />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex w-full py-2 flex-col bg-blue-50 mt-2 p-4 md:p-5 rounded-md text-sm md:text-base">
        {data.college && (
          <p className="font-semibold text-gray-700 break-words">
            College / School: {data.college}
          </p>
        )}

        {data.joiningYear && data.completionYear && (
          <p>
            <span className="text-blue-700 font-semibold">
              {data.joiningYear}
            </span>{" "}
            -{" "}
            <span className="text-blue-700 font-semibold">
              {data.completionYear}
            </span>
          </p>
        )}

        {data.stream && (
          <p>
            Stream:{" "}
            <span className="text-blue-600 font-semibold">{data.stream}</span>
          </p>
        )}

        {data.aggregateType && (
          <p>
            Aggregate Type:{" "}
            <span className="font-semibold text-blue-600">
              {data.aggregateType}
            </span>
          </p>
        )}

        {data.aggregate && data.max && (
          <p>
            Marks:{" "}
            <span className="font-semibold text-blue-600">
              {data.aggregate} {data.aggregateType === "percentage" && "%"}{" "}
              {data.aggregateType != "percentage" && `/ ${data.max}`}
            </span>
          </p>
        )}

        {data.activeBacklogs > 0 && (
          <p>
            <span className="text-blue-600 font-semibold">
              {data.activeBacklogs}
            </span>
          </p>
        )}

        {isModalOpen && (
          <EducationDetailsModal
            onClose={() => setIsModalOpen(false)}
            title={title}
            initialData={selectedEducation}
            onSubmit={(updatedData) => {
              //console.log("Updated Data: ", updatedData);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default EducationDetailsDisplay;
