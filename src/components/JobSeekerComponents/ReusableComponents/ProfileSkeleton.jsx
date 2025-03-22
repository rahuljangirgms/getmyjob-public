import React from 'react'

function ProfileSkeleton() {
    return (
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 animate-pulse">
          {/* Profile Picture & Info Skeleton */}
          <div className="flex flex-col items-center text-center border-b-2 border-gray-200 pb-3">
            <div className="w-20 h-20 rounded-full bg-gray-300"></div>
            <div className="mt-4 h-5 w-32 bg-gray-300 rounded"></div>
            <div className="mt-2 h-4 w-24 bg-gray-300 rounded"></div>
            <div className="mt-2 h-4 w-40 bg-gray-300 rounded"></div>
          </div>
    
          {/* Metrics Skeleton */}
          <div className="mt-6 space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-gray-300 w-10 h-10"></div>
                <div>
                  <div className="h-4 w-24 bg-gray-300 rounded"></div>
                  <div className="mt-2 h-5 w-16 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}

export default ProfileSkeleton
