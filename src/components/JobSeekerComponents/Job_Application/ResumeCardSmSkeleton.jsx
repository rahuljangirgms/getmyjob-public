import React from "react";

function ResumeCardSmSkeleton() {
  return (
    <div className="bg-white h-20 w-64 rounded-lg px-4 py-1 flex flex-row items-center justify-between border border-gray-300 shadow-lg animate-pulse">
      {/* Title Skeleton */}
      <div className="w-28 h-4 bg-gray-300 rounded"></div>

      {/* Button Skeleton */}
      <div className="w-20 h-8 bg-gray-300 rounded"></div>
    </div>
  );
}

export default ResumeCardSmSkeleton;
