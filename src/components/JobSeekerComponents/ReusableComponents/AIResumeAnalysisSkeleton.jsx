import React from "react";
import { IoSparklesSharp } from "react-icons/io5";

function AIResumeAnalysisSkeleton() {
  return (
    <div className="mx-36 bg-white p-6 my-6 rounded-xl shadow-2xl">
      {/* Center Sparkle Title */}
      <div className="flex gap-1 justify-center items-center mb-6">
        <div className="w-6 h-6 bg-yellow-100 rounded-full animate-bounce"></div>
        <div className="h-6 w-48 bg-gray-200 rounded-lg animate-bounce"></div>
      </div>

      {/* Middle Message */}
      <div className="flex flex-row items-center gap-3 justify-center my-8">
        <IoSparklesSharp size={40} className="text-yellow-500 animate-bounce"/>
        <p className="text-blue-700 font-bold animate-bounce text-2xl">
            Analyzing Your Resume...
        </p>
      </div>

      {/* Skeleton Sections */}
      {[...Array(6)].map((_, idx) => (
        <div className="py-4" key={idx}>
          <div className="flex flex-row gap-2 items-center mb-2">
            <div className="w-5 h-5 bg-gray-300 rounded-full" />
            <div className="h-5 w-60 bg-gray-300 rounded-md" />
          </div>
          <div className="space-y-2 pl-6">
            <div className="w-11/12 h-4 bg-gray-200 rounded" />
            <div className="w-10/12 h-4 bg-gray-200 rounded" />
            <div className="w-8/12 h-4 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default AIResumeAnalysisSkeleton;
