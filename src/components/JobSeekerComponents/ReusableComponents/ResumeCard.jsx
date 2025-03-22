import React from "react";
import { FaStar } from "react-icons/fa";

const ResumeCard = ({ imageSrc, isRecommended, isPaid }) => {
  return (
    <div className="relative bg-gray-100 rounded-lg shadow-md flex flex-col w-full h-82 overflow-hidden cursor-pointer hover:opacity-40">
      {/* Paid Star (Top Right Corner) */}
      {isPaid && (
        <div className="absolute top-2 right-2 bg-yellow-400 text-white rounded-md p-1 shadow-md">
          <FaStar className="w-4 h-4" />
        </div>
      )}

      {/* Image Placeholder (Fixed Height & Full Fit) */}
      <div className="w-full h-full flex items-center justify-center">
        <img
          src={imageSrc}
          alt="Resume Template"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Recommended Label */}
      {isRecommended && (
        <div className="absolute bottom-0 w-full bg-teal-500 text-white text-sm font-bold text-center py-1 rounded-b-lg">
          RECOMMENDED
        </div>
      )}
    </div>
  );
};

export default ResumeCard;
