import React from "react";

function JobDetailSkeloton() {
  return (
    <div>
      <div className="h-44 bg-gradient-to-r from-white to-gray-400"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 animate-pulse">
        {/* Job Card Skeleton */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row md:items-start">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-lg" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-48" />
              <div className="h-3 bg-gray-200 rounded w-32" />
            </div>
          </div>
          <div className="flex mt-4 md:mt-0 md:ml-auto space-x-2 gap-2 md:gap-0 flex-col md:flex-row">
            <div className="w-24 h-8 bg-gray-200 rounded" />
            <div className="w-64 h-8 bg-gray-200 rounded" />
            <div className="w-20 h-8 bg-gray-300 rounded" />
          </div>
        </div>

        {/* Main Content & Sidebar Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-6">
            {[1, 2, 3, 4].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm p-6 space-y-3"
              >
                <div className="h-5 bg-gray-300 w-40 rounded" />
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                  <div className="h-3 bg-gray-200 rounded w-4/6" />
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Details Skeleton */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
              <div className="h-5 bg-gray-300 w-40 rounded" />
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-gray-300 rounded" />
                  <div className="space-y-1">
                    <div className="h-3 w-32 bg-gray-200 rounded" />
                    <div className="h-3 w-24 bg-gray-100 rounded" />
                  </div>
                </div>
              ))}
            </div>

            {/* Latest Activity Skeleton */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
              <div className="h-5 bg-gray-300 w-40 rounded" />
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-lg" />
                <div className="space-y-1">
                  <div className="h-3 w-24 bg-gray-200 rounded" />
                  <div className="h-3 w-32 bg-gray-100 rounded" />
                  <div className="h-2 w-20 bg-gray-100 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetailSkeloton;
