import React from 'react'
import avtar from './../../assets/images/userImages/avtar2.jpg'
import { AiFillEye } from "react-icons/ai";
import { PiBagFill } from "react-icons/pi";
import { RiMessage2Fill } from "react-icons/ri";
import { RiMap2Fill } from "react-icons/ri";



function VerticalProfileCard({profileData}) {


  
  return (
    <div className="max-w-sm mx-auto space-y-4">
    {/* Profile Section */}
    <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
      <div className="flex flex-col items-center text-center  border-b-2 border-gray-200 pb-3">
        <img
          src={profileData.profilePicture}
          alt='user-image'
          className="w-20 h-20 rounded-full bg-indigo-100"
        />
        <h2 className="mt-4 text-xl font-semibold text-gray-900">{profileData.firstName} {profileData.lastName}</h2>
        <p className="text-gray-600">{profileData.specialization}</p>
        <p className="text-gray-500 text-sm">Experience: {profileData.totalExpYear} Years {profileData.totalExpMonth} Months</p>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-blue-50">
            <AiFillEye className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-600">Search appear</p>
            <p className="font-semibold">10x</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-green-50">
            <PiBagFill className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-gray-600">Applied Job</p>
            <p className="font-semibold">50</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-amber-50">
            <RiMessage2Fill className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-gray-600">Recruiters Respond</p>
            <p className="font-semibold">35</p>
          </div>
        </div>
      </div>
    </div>
    {/* Guidance Section */}
    <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-200">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center">
          <span className="text-red-600 text-sm"><RiMap2Fill size={25} className='text-red-600'/></span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Guidance for you</h3>
          <p className="text-sm text-gray-500">based on your activity</p>
        </div>
      </div>
      <div className="bg-blue-500 rounded-xl p-4 text-white">
        <p className="text-lg font-medium">Tips to improve your resume</p>
      </div>
      <p className="text-gray-600 text-sm py-4">
        Boost your career with expert-led courses on resume improvement and
        networking to land your next opportunity.
      </p>
   
    </div>
  </div>
  )
}

export default VerticalProfileCard
