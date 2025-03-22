import React from "react";

const getProgressColor = (percentage) => {
  if (percentage <= 20) return "bg-red-600";
  if (percentage <= 40) return "bg-yellow-500";
  if (percentage <= 60) return "bg-blue-600";
  if (percentage <= 80) return "bg-indigo-600";
  return "bg-green-600";
};

const ProfileCompletionBar = ({ percentage }) => {
  return (
    <div className="relative w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        className={`h-2.5 rounded-full transition-all duration-500 ${getProgressColor(percentage)}`}
        style={{ width: `${percentage}%` }}
      >
        <span className="absolute right-0 -top-6 text-xs font-semibold text-gray-700 dark:text-gray-300">
          {percentage}%
        </span>
      </div>
    </div>
  );
};

export default ProfileCompletionBar;
