import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe, FaLinkedin, FaGithub } from "react-icons/fa";

const Resume = ({ data }) => {
  const { personalInformation, certificationDetails, contactDetails, professionalDetails, projectDetails, educationDetails } = data;

  return (
    <div className="w-full bg-white p-6 shadow-lg rounded-lg">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">{`${personalInformation.firstName} ${personalInformation.middleName} ${personalInformation.lastName}`}</h1>
        <p className="text-gray-600">{personalInformation.specialization}</p>
        <div className="flex justify-center gap-4 text-gray-600 mt-2">
          <span className="flex items-center gap-1"><FaMapMarkerAlt /> {`${personalInformation.city}, ${personalInformation.state}`}</span>
          <span className="flex items-center gap-1"><FaPhoneAlt /> {personalInformation.phoneNumber}</span>
          <span className="flex items-center gap-1"><FaEnvelope /> {personalInformation.email}</span>
        </div>
      </div>

      {/* Profiles */}
      <div className="mt-4 flex justify-center gap-6">
        {contactDetails.linkedInUrl && (
          <a href={contactDetails.linkedInUrl} className="flex items-center gap-2 text-blue-500">
            <FaLinkedin /> LinkedIn
          </a>
        )}
        {contactDetails.githubUrl && (
          <a href={contactDetails.githubUrl} className="flex items-center gap-2 text-gray-700">
            <FaGithub /> GitHub
          </a>
        )}
      </div>

      {/* Summary */}
      <div className="mt-6">
        <h2 className="text-lg font-bold">Summary</h2>
        <p className="text-gray-700">{data.otherDetails.summary}</p>
      </div>

      {/* Experience Section */}
      <div className="mt-6">
        <h2 className="text-lg font-bold">Experience</h2>
        {professionalDetails.map((exp, index) => (
          <div key={index} className="mt-2">
            <h3 className="font-semibold">{exp.organisation} - {exp.designation}</h3>
            <p className="text-sm text-gray-600">{`${exp.from} to ${exp.to}`} | {exp.city}, {exp.state}</p>
            <p className="text-gray-700">{exp.description}</p>
          </div>
        ))}
      </div>

      {/* Education Section */}
      <div className="mt-6">
        <h2 className="text-lg font-bold">Education</h2>
        {educationDetails.map((edu, index) => (
          <div key={index} className="mt-2">
            <h3 className="font-semibold">{edu.data.college}</h3>
            <p className="text-sm text-gray-600">{`${edu.data.joiningYear} - ${edu.data.completionYear}`}</p>
            <p className="text-gray-700">{edu.data.qualification} - {edu.data.stream}</p>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="mt-6">
        <h2 className="text-lg font-bold">Projects</h2>
        {projectDetails.map((project, index) => (
          <div key={index} className="mt-2">
            <h3 className="font-semibold">{project.name}</h3>
            <p className="text-sm text-gray-600">{project.projectLink && <a href={project.projectLink} className="text-blue-500">View Project</a>}</p>
            <p className="text-gray-700">{project.description}</p>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="mt-6">
        <h2 className="text-lg font-bold">Skills</h2>
        <div className="grid grid-cols-2 gap-2">
          {data.otherDetails.expertise.map((skill, index) => (
            <span key={index} className="text-gray-700">{skill}</span>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="mt-6">
        <h2 className="text-lg font-bold">Certifications</h2>
        {certificationDetails.map((cert, index) => (
          <div key={index} className="mt-2">
            <h3 className="font-semibold">{cert.name}</h3>
            <p className="text-sm text-gray-600">{cert.provider} | {cert.validUpto}</p>
          </div>
        ))}
      </div>

      {/* Languages */}
      <div className="mt-6">
        <h2 className="text-lg font-bold">Languages</h2>
        <p className="text-gray-700">{personalInformation.knownLanguages.join(", ")}</p>
      </div>

      {/* References */}
      <div className="mt-6">
        <h2 className="text-lg font-bold">References</h2>
        <p className="text-gray-700">Available upon request</p>
      </div>
    </div>
  );
};

export default Resume;
