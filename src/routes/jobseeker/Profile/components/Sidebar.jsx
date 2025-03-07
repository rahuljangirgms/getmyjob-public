import React from "react";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { useSelector } from "react-redux";
import { GrTrophy } from "react-icons/gr";
import { TiStar } from "react-icons/ti";

function Sidebar() {
  const personalInformation = useSelector(
    (state) => state.profileForms.personalInformation
  );

  return (
    <div className="row-span-3 col-start-5 bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg">
      <div className="flex flex-col items-center text-center border-b-2 border-gray-200 pb-4">
        <img
          src={personalInformation.profilePicture}
          alt="user-image"
          className="w-20 h-20 rounded-full bg-indigo-100"
        />
        <h2 className="mt-4 text-xl font-semibold text-gray-900">
          {personalInformation.firstName} {personalInformation.lastName}
        </h2>
        <p className="text-gray-600">{personalInformation.specialization}</p>
        <p className="text-gray-500 text-sm">
          Experience: {personalInformation.totalExpYear} Years{" "}
          {personalInformation.totalExpMonth} Months
        </p>
      </div>

      {/* Contact Section */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-blue-50">
            <AiOutlinePhone className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-600">Phone</p>
            <p className="font-semibold">{personalInformation.phoneNumber}</p>
          </div>
        </div>
        {/* <div className="flex items-center space-x-3">
        <div className="p-2 rounded-full bg-green-50">
          <BsWhatsapp className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <p className="text-gray-600">Whatsapp</p>
          <p className="font-semibold">
            {personalInformation.phoneNumber}
          </p>
        </div>
      </div> */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-purple-50">
            <AiOutlineMail className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-gray-600">Email</p>
            <p className="font-semibold">{personalInformation.email}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-yellow-50">
            <GrTrophy className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <p className="text-gray-600">Skills</p>
            <p className="font-semibold">Your Skill Showcase</p>
          </div>
        </div>
      </div>

      <div className="flex flex-row flex-wrap my-6 gap-2">
        <button
          type="button"
          className="inline-flex items-center px-2 py-2.5 text-sm font-medium text-center text-blue-700 bg-blue-50 rounded-full hover:bg-blue-50 focus:ring-4 focus:outline-none"
        >
          JavaScript
          <span className="inline-flex items-center justify-center w-8 h-8 ms-2 text-xs font-bold text-white bg-blue-500 rounded-full">
            <TiStar size={22} />
          </span>
        </button>

        <button
          type="button"
          className="inline-flex items-center px-2 py-2.5 text-sm font-medium text-center text-blue-700 bg-blue-50 rounded-full hover:bg-blue-50 focus:ring-4 focus:outline-none"
        >
          HTML
          <span className="inline-flex items-center justify-center w-8 h-8 ms-2 text-xs font-bold text-white bg-blue-500 rounded-full">
            <TiStar size={22} />
          </span>
        </button>

        <button
          type="button"
          className="inline-flex items-center px-2 py-2.5 text-sm font-medium text-center text-blue-700 bg-blue-50 rounded-full hover:bg-blue-50 focus:ring-4 focus:outline-none"
        >
          React JS
          <span className="inline-flex items-center justify-center w-8 h-8 ms-2 text-xs font-bold text-white bg-blue-500 rounded-full">
            <TiStar size={22} />
          </span>
        </button>

        <button
          type="button"
          className="inline-flex items-center px-2 py-2.5 text-sm font-medium text-center text-blue-700 bg-blue-50 rounded-full hover:bg-blue-50 focus:ring-4 focus:outline-none"
        >
          Angular
          <span className="inline-flex items-center justify-center w-8 h-8 ms-2 text-xs font-bold text-white bg-blue-500 rounded-full">
            <TiStar size={22} />
          </span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
