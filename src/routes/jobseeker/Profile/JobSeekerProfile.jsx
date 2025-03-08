import React, { useState } from "react";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import ProfilePanel from "./components/ProfilePanel";
import Sidebar from "./components/Sidebar";
import ResumeSection from './components/ResumeSection';



function JobSeekerProfile() {
  const [available, setAvailable] = useState(true);

  // ✅ Personal Information Data
  const personalInformation = {
    firstName: "Abhishek",
    middleName: "Uday",
    lastName: "Salokhe",
    email: "abhisaloke2424@gmail.com",
    phoneNumber: 8767977069,
    dateOfBirth: "2003-03-24",
    gender: "Male",
    maritalStatus: "Single",
    addressLine1: "Maharashtra Housing Board",
    addressLine2: "L 49 122",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    zipCode: "411006",
    course: "Computer Engineering",
    specialization: "Software Engineer",
    bloodGroup: "O+",
    medicalHistory: "No History",
    disability: "No",
    knownLanguages: ["English", "Hindi", "Marathi"],
    totalExpYear: "0",
    totalExpMonth: "11",
  };

  return (
       <div className=" bg-gray-50 mt-20 p-8 flex flex-col md:flex-col lg:flex-row gap-4">
      {/* Left Section (60% Width) */}
      <div className="w-full md:w-full lg:w-4/5 flex flex-col gap-4 order-last lg:order-1">
        {/* First Box inside Left Section */}
        <div className="flex-1 bg-white flex p-6 rounded-lg shadow-md order-2 lg:order-1">

          <ResumeSection/>

        </div>
        {/* Second Box inside Left Section */}
        <div className="flex-1 flex items-center justify-center rounded-lg shadow-md order-1 lg:order-2">
          <ProfilePanel/>
        </div>
      </div>

      {/* Right Section (40% Width) */}
      <div className="w-full md:w-full lg:w-3/12 flex rounded-lg shadow-md order-1 lg:order-1">
        <Sidebar/>
      </div>
    </div>

  );
}

export default JobSeekerProfile;
