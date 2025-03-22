import React from 'react'
import { LuFileUser } from 'react-icons/lu';
import { FaAnglesRight } from 'react-icons/fa6';

function CompleteProfileToast({handleCompleteProfile}) {
  return (
    <div
          className="absolute top-[10%] md:top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
              bg-white shadow-lg rounded-lg p-4 flex flex-col items-center w-80 z-20"
        >
          {/* Profile Icon */}
          <div className="bg-blue-300 p-3 rounded-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
            <LuFileUser className="h-10 w-10 text-white"/>
          </div>

          {/* Text */}
          <p className="text-center text-black font-semibold mt-2">
            Please Complete Your Profile To View and Apply For Jobs
          </p>

          {/* Button */}
          <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mt-3 flex items-center" onClick={()=>handleCompleteProfile()}>
            Complete My Profile
            <FaAnglesRight className="h-5 w-5 ml-2"/>
          </button>
        </div>
  )
}

export default CompleteProfileToast
