import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoBagOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';


function ProfilePanel() {
  const profileData = useSelector((state) => state.profileForms.finalData);
  const [available, setAvailable] = useState(true);

  const navigate = useNavigate();

  if (!profileData)
    return (
      <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" 
      onClick={()=> navigate('/jobseeker/complete-profile-form/personal-info')}
      >Complete My Profile Now</button>
    );

  const {
    personalInformation,
    contactDetails,
    professionalDetails,
    educationDetails,
    projectDetails,
    researchPapers,
    trainingDetails,
    certificationDetails,
    internshipDetails,
    otherDetails,
  } = profileData;

  return (
    <div className="mx-auto bg-white rounded-2xl shadow-lg p-6 w-full">
      {/* Header Section */}
      <div className="flex gap-3 lg:gap-0 flex-col lg:flex-row justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Your Profile</h1>

        <div className="flex items-center space-x-2">
            <button
              className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 focus:outline-none ${
                available ? "bg-blue-700 justify-end" : "bg-gray-300 justify-start"
              }`}
              onClick={() => setAvailable(!available)}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-md mx-1"></div>
            </button>
            <span className="text-sm text-gray-600 font-semibold flex items-center gap-2">
              I am Open To Work <IoBagOutline size={20} />
            </span>
          </div>
        <button className="px-4 py-2 bg-blue-700 text-white font-semibold rounded-md"
            onClick={()=> navigate('/jobseeker/complete-profile-form/personal-info')}
        >
          Edit My Profile
        </button>
      </div>

      {/* General Information */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold text-blue-700 border-b pb-2">
          General Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {Object.entries({
            "First Name": personalInformation.firstName,
            "Middle Name": personalInformation.middleName,
            "Last Name": personalInformation.lastName,
            "Date of Birth": personalInformation.dateOfBirth,
            Gender: personalInformation.gender,
            "Marital Status": personalInformation.maritalStatus,
          }).map(([label, value]) => (
            <div key={label}>
              <p className="text-sm text-gray-600">{label}</p>
              <p className="font-semibold text-black">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
          Skills & Expertise
        </h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {otherDetails.expertise.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
          Soft Skills
        </h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {otherDetails.softSkills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Contact Details */}
      {/* <section className="mt-6">
        <h2 className="text-xl font-semibold text-blue-700 border-b pb-2">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="flex items-center space-x-3">
            <AiOutlinePhone className="w-5 h-5 text-blue-600" />
            <p className="font-semibold">{personalInformation.phoneNumber}</p>
          </div>
          <div className="flex items-center space-x-3">
            <BsWhatsapp className="w-5 h-5 text-green-600" />
            <p className="font-semibold">{contactDetails.secondaryPhone}</p>
          </div>
          <div className="flex items-center space-x-3">
            <AiOutlineMail className="w-5 h-5 text-purple-600" />
            <p className="font-semibold">{personalInformation.email}</p>
          </div>
        </div>
      </section> */}

      {/* Address */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold text-blue-700 border-b pb-2">
          Address
        </h2>
        <p className="font-semibold text-black">
          {personalInformation.addressLine1}, {personalInformation.addressLine2}
          , {personalInformation.city}, {personalInformation.state},{" "}
          {personalInformation.country} - {personalInformation.zipCode}
        </p>
      </section>

      {/* Education Details */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold text-blue-700 border-b pb-2">
          Education
        </h2>
        {educationDetails.map((edu, index) => (
          <div key={index} className="mt-3">
            <h3 className="font-semibold text-lg text-black">
              {edu.data.qualification}
            </h3>
            <p className="text-gray-600">
              {edu.data.college}, {edu.data.collegeCity} ({edu.data.joiningYear}{" "}
              - {edu.data.completionYear})
            </p>
          </div>
        ))}
      </section>

      {/* Professional Experience */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold text-blue-700 border-b pb-2">
          Work Experience
        </h2>
        {professionalDetails.map((job, index) => (
          <div key={index} className="mt-3">
            <h3 className="font-semibold text-lg text-black">
              {job.designation} at {job.organisation}
            </h3>
            <p className="text-gray-600">
              {job.department}, {job.city} ({job.from} - {job.to})
            </p>
          </div>
        ))}
      </section>

      {/* Certifications */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold text-blue-700 border-b pb-2">
          Certifications
        </h2>
        {certificationDetails.map((cert, index) => (
          <div key={index} className="mt-3">
            <h3 className="font-semibold text-lg text-black">
              {cert.name} by {cert.provider}
            </h3>
            <p className="text-gray-600">Valid Until: {cert.validUpto}</p>
          </div>
        ))}
      </section>

      {/* Projects */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold text-blue-700 border-b pb-2">
          Projects
        </h2>
        {projectDetails.map((project, index) => (
          <div key={index} className="mt-3">
            <h3 className="font-semibold text-lg text-black">{project.name}</h3>
            <p className="text-gray-600">
              Mentor: {project.mentor}, Team Size: {project.teamSize}
            </p>
          </div>
        ))}
      </section>

      {/* Internships */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold text-blue-700 border-b pb-2">
          Internships
        </h2>
        {internshipDetails.map((intern, index) => (
          <div key={index} className="mt-3">
            <h3 className="font-semibold text-lg text-black">
              {intern.title} at {intern.organisation}
            </h3>
            <p className="text-gray-600">
              {intern.city}, {intern.from} - {intern.to}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default ProfilePanel;
