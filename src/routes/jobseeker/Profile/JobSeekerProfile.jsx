import React, { useState } from "react";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import ProfilePanel from './components/ProfilePanel';
import Sidebar from './components/Sidebar';


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
    <div className="p-8">
      <div className="grid grid-cols-5 grid-rows-5 gap-4 mt-20">
        {/* ✅ Left Profile Section - Green Background */}
        <div className="col-span-4 row-span-5">
            <ProfilePanel/>
        </div>

        {/* ✅ Right Sidebar - Profile Card */}
        <Sidebar/>

        {/* ✅ Bottom Section */}
        <div className="row-span-2 col-start-5 row-start-4 bg-gray-400 flex items-center justify-center">
          <p className="text-white">Other Content</p>
        </div>
      </div>
    </div>
  );
}

export default JobSeekerProfile;
