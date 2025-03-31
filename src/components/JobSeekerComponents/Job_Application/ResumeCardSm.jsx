import React from "react";
import { FiEye } from "react-icons/fi";

function ResumeCardSm({ title, onSelect, selectedResId, resId, filePath }) {
  const isSelected = selectedResId === resId;

  return (
    <div
      className={` h-20 w-64 rounded-lg px-4 py-1 flex flex-row items-center justify-between border ${
        isSelected ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
      } shadow-lg cursor-pointer`}
      onClick={onSelect}
    >
      {/* Title */}
      <h1 className="text-sm font-semibold">{title}</h1>

      {/* View Button */}
      <a
         href={filePath}
         target="_blank"
         rel="noopener noreferrer"
        className="flex flex-row items-center justify-center gap-2 text-blue-700 border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
      >
        <FiEye size={16} /> View
      </a>
    </div>
  );
}

export default ResumeCardSm;
