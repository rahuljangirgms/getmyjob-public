import React from 'react';

function ResumeSkeloton() {
  return (
    <div className="animate-pulse w-full mx-auto bg-white shadow-md rounded-lg p-4 sm:p-6 md:p-8 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col space-y-2">
        <div className="w-2/3 sm:w-40 h-6 bg-gray-300 rounded"></div>
        <div className="w-3/4 sm:w-56 h-4 bg-gray-300 rounded"></div>
        <div className="w-4/5 sm:w-64 h-4 bg-gray-300 rounded"></div>
      </div>

      <div className="border-b border-gray-300 my-4"></div>

      {/* Sections */}
      {[...Array(3)].map((_, index) => (
        <div key={index} className="space-y-3">
          {/* Section Title */}
          <div className="w-2/3 sm:w-48 h-5 bg-gray-300 rounded"></div>

          {/* Section Content */}
          <div className="space-y-2">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="w-full h-4 bg-gray-300 rounded"></div>
            ))}
          </div>

          <div className="space-y-2">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="w-full h-4 bg-gray-300 rounded"></div>
            ))}
          </div>

          <div className="border-b border-gray-300 my-4"></div>
        </div>
      ))}
    </div>
  );
}

export default ResumeSkeloton;
