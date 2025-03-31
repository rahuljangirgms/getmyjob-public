import React from "react";

function ChangePasswordSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center md:flex-col w-full bg-transparent min-h-[500px] md:min-h-[750px]">
      <div
        className="flex flex-col justify-center p-4 md:p-2 lg:p-12 w-full md:w-1/3 shadow-xl rounded-lg animate-pulse"
        style={{ backgroundColor: "#1A1F2C" }}
      >
        <div className="w-full p-4 space-y-6">
          {/* Logo Placeholder */}
          <div className="flex justify-center">
            <div className="h-16 w-16 bg-gray-500 rounded-full" />
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-2 text-center">
            <div className="h-6 w-2/3 bg-gray-600 mx-auto rounded-md" />
            <div className="h-4 w-1/2 bg-gray-500 mx-auto rounded-md" />
          </div>

          {/* Input Fields */}
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-1/3 bg-gray-500 rounded-md" />
              <div className="h-10 w-full bg-gray-600 rounded-md" />
            </div>
          ))}

          {/* Button */}
          <div className="h-12 w-full bg-blue-700 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordSkeleton;
