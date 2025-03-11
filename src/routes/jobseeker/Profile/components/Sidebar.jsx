import React from "react";
import { AiOutlineMail } from "react-icons/ai";

import { useSelector } from "react-redux";
import { GrTrophy } from "react-icons/gr";
import { TiStar } from "react-icons/ti";
import { MdOutlinePhone } from "react-icons/md";
import SkillBedge from "./SkillBedge";
import TestScore from "./TestScore";

import dummyPrfileImg from './../../../../assets/images/dummyuser.png'

function Sidebar() {
  const personalInformation = useSelector(
    (state) => state.profileForms.personalInformation
  );

  const {user} = JSON.parse(localStorage.getItem("auth"));


  return (
    <div className="w-full row-span-3 col-start-5 bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg">
      <div className="flex flex-col items-center text-center border-b-2 border-gray-200 pb-4">
        <img
          src={personalInformation.profilePicture || dummyPrfileImg}
          alt="user-image"
          className="w-20 h-20 rounded-full bg-indigo-100"
        />
        <h2 className="mt-4 text-xl font-semibold text-gray-900">
          {user.name}
        </h2>
        <p className="text-gray-600">{personalInformation.specialization}</p>
       {personalInformation.totalExpYear && personalInformation.totalExpMonth &&   <p className="text-gray-500 text-sm">
          Experience: {personalInformation.totalExpYear} Years{" "}
          {personalInformation.totalExpMonth} Months
        </p>}
      </div>

      {/* Contact Section */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-blue-50">
            <MdOutlinePhone className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-600">Phone</p>
            <p className="font-semibold">{user.mobile}</p>
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
            <p className="font-semibold">{user.email}</p>
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
        <SkillBedge title={"Aptitude"} />
        <SkillBedge title={"JavaScript"} />
        <SkillBedge title={"React Js"} />
        <SkillBedge title={"Angular"} />
        <SkillBedge title={"Node Js"} />
      </div>

      <div className="flex flex-col">
        <h2 className="text-xl font-semibold text-blue-700 border-b-2 pb-2">
          Your Test Scores
        </h2>
        <TestScore Skill={"Aptitude"} Score={98} />

        <TestScore Skill={"JavaScript"} Score={78} />
        <TestScore Skill={"React Js"} Score={40} />
        <TestScore Skill={"Angular"} Score={88} />
        <TestScore Skill={"Node Js"} Score={78} />
      </div>
    </div>
  );
}

export default Sidebar;
