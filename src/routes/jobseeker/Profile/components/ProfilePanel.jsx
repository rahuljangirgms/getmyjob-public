import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoBagOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getMasterResumeRequest } from "./../../../../store/slices/jobSeeker/master_Resume_Data/masterResumeSlice";
import { checkProfileCompleteRequest } from "./../../../../store/slices/jobSeeker/isProfileCompleted/isProfileCompleteSlice";

function SkeletonBox({ width = "w-full", height = "h-6", rounded = "rounded-md" }) {
  return (
    <div className={`bg-gray-200 animate-pulse ${width} ${height} ${rounded}`}></div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <SkeletonBox width="w-1/3" height="h-8" />
        <div className="flex items-center gap-4">
          <SkeletonBox width="w-12" height="h-6" rounded="rounded-full" />
          <SkeletonBox width="w-32" height="h-6" />
          <SkeletonBox width="w-24" height="h-8" />
        </div>
      </div>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="mb-6">
          <SkeletonBox width="w-2/5" height="h-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {[...Array(3)].map((_, j) => (
              <SkeletonBox key={j} height="h-5" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProfilePanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [available, setAvailable] = useState(true);

  const masterResumeState = useSelector((state) => state.masterResumeJson);
  const masterResumeJson = masterResumeState?.data || null;
  const loading = masterResumeState?.loading;

  const isProfileCompleted = useSelector(
    (state) => state.isProfileComplete.isComplete
  );

  useEffect(() => {
    dispatch(getMasterResumeRequest());
    dispatch(checkProfileCompleteRequest());
  }, [dispatch]);

  if (loading) return <ProfileSkeleton />;

  if (!isProfileCompleted) {
    return (
      <button
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={() => navigate("/jobseeker/complete-profile-form/personal-info")}
      >
        Complete My Profile Now
      </button>
    );
  }

  if (!masterResumeJson || Object.keys(masterResumeJson).length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow text-center text-gray-500">
        No resume data found.
      </div>
    );
  }

  // ✅ Destructure safely
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
  } = masterResumeJson;

  return (
    <div className="mx-auto bg-white rounded-2xl shadow-lg p-6 w-full">
 <div>
          {/* Header */}
          <div className="flex gap-3 lg:gap-0 flex-col lg:flex-row justify-between items-center border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-800">Your Profile</h1>

            <div className="flex items-center space-x-2">
              <button
                className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 focus:outline-none ${
                  available
                    ? "bg-blue-700 justify-end"
                    : "bg-gray-300 justify-start"
                }`}
                onClick={() => setAvailable(!available)}
              >
                <div className="w-5 h-5 rounded-full bg-white shadow-md mx-1"></div>
              </button>
              <span className="text-sm text-gray-600 font-semibold flex items-center gap-2">
                I am Open To Work <IoBagOutline size={20} />
              </span>
            </div>

            <button
              className="px-4 py-2 bg-blue-700 text-white font-semibold rounded-md"
              onClick={() =>
                navigate("/jobseeker/complete-profile-form/personal-info")
              }
            >
              Edit My Profile
            </button>
          </div>

          {/* General Info */}
          <section className="mt-6">
            <h2 className="text-xl font-semibold text-blue-700 border-b pb-2">
              General Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {Object.entries({
                "First Name": personalInformation.firstName,
                "Middle Name": personalInformation.middleName,
                "Last Name": personalInformation.lastName,
                Email: personalInformation.email,
                Phone: personalInformation.phoneNumber,
                "Date of Birth": personalInformation.dateOfBirth,
                Gender: personalInformation.gender,
                "Marital Status": personalInformation.maritalStatus,
                "Blood Group": personalInformation.bloodGroup,
                "Medical History": personalInformation.medicalHistory,
                Disability: personalInformation.disability,
              }).map(([label, value]) => (
                <div key={label}>
                  <p className="text-sm text-gray-600">{label}</p>
                  <p className="font-semibold text-black">{value || "N/A"}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Skills  */}
          {otherDetails?.skills?.length > 0 && (
            <section className="mt-6">
              <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
                Skills & Expertise
              </h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {otherDetails.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

           {/* Soft Skills */}

          {otherDetails?.soft_skills?.length > 0 && (
            <section className="mt-6">
              <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
                Soft Skills
              </h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {otherDetails.soft_skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Achievements */}
          {otherDetails?.achievement?.length > 0 && (
            <section className="mt-6">
              <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
                Achievements
              </h2>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                {otherDetails.achievement.map((achievement, i) => (
                  <li key={i} className="text-gray-800 text-sm font-semibold">
                    {achievement}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Extra Curricular   */}
          {otherDetails?.extra_curricular?.length > 0 && (
            <section className="mt-6">
              <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
                Extra Curricular
              </h2>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                {otherDetails.extra_curricular.map((extra_curricular, i) => (
                  <li key={i} className="text-gray-800 text-sm font-semibold">
                    {extra_curricular}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Address */}
          <section className="mt-6">
            <h2 className="text-xl font-semibold text-blue-700 border-b pb-2">
              Address
            </h2>
            <p className="font-semibold text-black">
              {personalInformation.addressLine1},{" "}
              {personalInformation.addressLine2}, {personalInformation.city},{" "}
              {personalInformation.state}, {personalInformation.country} -{" "}
              {personalInformation.zipCode}
            </p>
          </section>

          {/* Education */}
          {educationDetails?.length > 0 && (
            <section className="mt-6">
              <h2 className="text-xl font-semibold text-blue-700 border-b pb-2">
                Education
              </h2>
              {educationDetails.map(({ data }, i) => (
                <div key={i} className="mt-3">
                  <h3 className="font-semibold text-lg text-black">
                    {data.qualification}
                  </h3>
                  <p className="text-gray-600">
                    {data.college}, {data.collegeCity} ({data.joiningYear} -{" "}
                    {data.completionYear})
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Work Experience */}
          {professionalDetails?.length > 0 && (
            <section className="mt-6">
              <h2 className="text-xl font-semibold text-blue-700 border-b pb-2">
                Work Experience
              </h2>
              {professionalDetails.map((job, i) => (
                <div key={i} className="mt-3">
                  <h3 className="font-semibold text-lg text-black">
                    {job.designation} at {job.organisation}
                  </h3>
                  <p className="text-gray-600">
                    {job.department}, {job.city} ({job.from} -{" "}
                    {job.to || "Present"})
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Certifications */}
          {certificationDetails?.length > 0 && (
            <section className="mt-6">
              <h2 className="text-xl font-semibold text-blue-700 border-b pb-2">
                Certifications
              </h2>
              {certificationDetails.map((cert, i) => (
                <div key={i} className="mt-3">
                  <h3 className="font-semibold text-lg text-black">
                    {cert.name} by {cert.provider}
                  </h3>
                  <p className="text-gray-600">Valid Until: {cert.validUpto}</p>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projectDetails?.length > 0 && (
            <section className="mt-6">
              <h2 className="text-xl font-semibold text-blue-700 border-b pb-2">
                Projects
              </h2>
              {projectDetails.map((project, i) => (
                <div key={i} className="mt-3">
                  <h3 className="font-semibold text-lg text-black">
                    {project.name}
                  </h3>
                  <p className="text-gray-600">
                    Mentor: {project.mentor}, Team Size: {project.teamSize}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Research Papers */}
          {researchPapers?.length > 0 && (
            <section className="mt-6">
              <h2 className="text-xl font-semibold text-blue-700 border-b pb-2">
                Research Papers
              </h2>
              {researchPapers.map((paper, i) => (
                <div key={i} className="mt-3">
                  <h3 className="font-semibold text-lg text-black">
                    {paper.name}
                  </h3>
                  <p className="text-gray-600">
                    Status: {paper.status}, Published In:{" "}
                    {paper.publicationName}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Trainings */}
          {trainingDetails?.length > 0 && (
            <section className="mt-6">
              <h2 className="text-xl font-semibold text-blue-700 border-b pb-2">
                Trainings
              </h2>
              {trainingDetails.map((training, i) => (
                <div key={i} className="mt-3">
                  <h3 className="font-semibold text-lg text-black">
                    {training.name}
                  </h3>
                  <p className="text-gray-600">
                    Institute: {training.instituteName} ({training.from} -{" "}
                    {training.to})
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Internships */}
          {internshipDetails?.length > 0 && (
            <section className="mt-6">
              <h2 className="text-xl font-semibold text-blue-700 border-b pb-2">
                Internships
              </h2>
              {internshipDetails.map((intern, i) => (
                <div key={i} className="mt-3">
                  <h3 className="font-semibold text-lg text-black">
                    {intern.title} at {intern.organisation}
                  </h3>
                  <p className="text-gray-600">
                    {intern.city}, {intern.from} - {intern.to}
                  </p>
                </div>
              ))}
            </section>
          )}
        </div>
    </div>
  );
}

export default ProfilePanel;
