// CandidateDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCandidatesRequest, updateCandidateInvitationRequest,  fetchCandidateTestsRequest, } from "../../../../store/slices/recruiter/candidateSlice";
import { fetchJobsRequest } from "../../../../store/slices/recruiter/jobSlice";
import CandidatePerformanceCard from "../../../../components/buttons/recruitercomponent/CandidatePerformanceCard";

// Helper functions remain the same:
function parseExperienceRange(requiredExperience) {
  if (typeof requiredExperience !== "string") return null;
  if (requiredExperience === "10-above") {
    return { lowerMonths: 120, upperMonths: Infinity };
  }
  const parts = requiredExperience.split("-");
  if (parts.length !== 2) return null;
  const lowerYears = parseFloat(parts[0]) || 0;
  const upperYears = parseFloat(parts[1]) || 0;
  return { lowerMonths: lowerYears * 12, upperMonths: upperYears * 12 };
}

function partialExperienceScore(totalMonths, lowerMonths, upperMonths) {
  if (totalMonths >= lowerMonths && totalMonths <= upperMonths) {
    return 100;
  }
  if (totalMonths < lowerMonths) {
    const ratio = (totalMonths / lowerMonths) * 100;
    return Math.round(Math.max(0, Math.min(100, ratio)));
  }
  if (totalMonths > upperMonths && upperMonths !== Infinity) {
    const ratio = (upperMonths / totalMonths) * 100;
    return Math.round(Math.max(0, Math.min(100, ratio)));
  }
  return 100;
}

function calculateTotalExperience(experienceArray) {
  if (!experienceArray || experienceArray.length === 0)
    return { totalMonths: 0, totalDuration: "", overallRange: "" };

  let totalMonths = 0;
  let earliestStart = null;
  let latestEnd = null;

  experienceArray.forEach((exp) => {
    const startDate = new Date(exp.from);
    const endDate = exp.to.toLowerCase() === "present" ? new Date() : new Date(exp.to);

    if (!earliestStart || startDate < earliestStart) {
      earliestStart = startDate;
    }
    if (!latestEnd || endDate > latestEnd) {
      latestEnd = endDate;
    }

    const months =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());
    totalMonths += months;
  });

  const years = Math.floor(totalMonths / 12);
  const leftoverMonths = totalMonths % 12;

  return {
    totalMonths,
    totalDuration: `${years} years${leftoverMonths ? ` ${leftoverMonths} months` : ""}`,
    overallRange: `From ${earliestStart.toLocaleDateString()} to ${latestEnd.toLocaleDateString()}`,
  };
}



const CandidateDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Parse jobId from query string
  const searchParams = new URLSearchParams(location.search);
  const jobId = searchParams.get("jobId");

  // Collapsible section states
  const [showAbout, setShowAbout] = useState(true);
  const [showExperience, setShowExperience] = useState(true);
  const [showSkills, setShowSkills] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showCertifications, setShowCertifications] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showInterviewRounds, setShowInterviewRounds] = useState(false);

  // Redux state
  const { candidates,candidateTests, loading, error } = useSelector((state) => state.candidates);
  const { jobs } = useSelector((state) => state.jobs) || {};
  const allJobs = [
    ...(jobs?.activeJobs || []),
    ...(jobs?.draftJobs || []),
    ...(jobs?.expiredJobs || []),
  ];

  useEffect(() => {
    if (!candidates || candidates.length === 0) {
      dispatch(fetchCandidatesRequest({}));
    }
    dispatch(fetchJobsRequest());
  }, [dispatch, candidates]);
  useEffect(() => {
    if (id && jobId) {
      dispatch(fetchCandidateTestsRequest({ candidateId: id, jobId }));
    }
  }, [dispatch, id, jobId]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const candidate = candidates.find((cand) => cand.id.toString() === id);
  if (!candidate) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-2">Candidate not found</h2>
        <Link to="/recruiter/dashboard/candidates" className="text-blue-600 hover:underline">
          &larr; Back to Candidates List
        </Link>
      </div>
    );
  }

  // Destructure candidate fields (new fields: interviewRounds, interviewScore, roundsLeft)
  const {
    name,
    title,
    location: candidateLocation,
    email,
    about,
    experience,
    education,
    certifications,
    skills,
    appliedJobs,
    jobinvitation,
    resumeUrl,
    interviewRounds, // array of round scores, e.g. [{ score: 80 }, { score: 70 }]
    interviewScore,  // overall interview score (e.g. average)
    roundsLeft,      // number of remaining rounds
  } = candidate;

  // Calculate total experience from candidate experience data
  let totalExpObj = { totalMonths: 0, totalDuration: "", overallRange: "" };
  if (Array.isArray(experience) && experience.length > 0) {
    totalExpObj = calculateTotalExperience(experience);
  } else if (typeof experience === "string") {
    const years = parseFloat(experience) || 0;
    totalExpObj = {
      totalMonths: years * 12,
      totalDuration: `${years.toFixed(1)} years`,
      overallRange: "",
    };
  }

  // Get the job's required skills and experience (from the first applied job)
  let requiredSkills = [];
  let requiredExperience = "";
  if (appliedJobs && appliedJobs.length > 0) {
    const appliedJobId = parseInt(appliedJobs[0]);
    const matchedJob = allJobs.find((job) => job.id === appliedJobId);
    if (matchedJob) {
      requiredSkills = matchedJob.skills || [];
      requiredExperience = matchedJob.experience || "";
    }
  }

  // Calculate experience match percentage
  let experienceRangeMatch = 0;
  const range = parseExperienceRange(requiredExperience);
  if (range && typeof totalExpObj.totalMonths === "number") {
    experienceRangeMatch = partialExperienceScore(
      totalExpObj.totalMonths,
      range.lowerMonths,
      range.upperMonths
    );
  }

  // Handler to send an invitation (updates candidate record)
  const handleSendInvite = () => {
    dispatch(updateCandidateInvitationRequest({ id: candidate.id, jobId, jobinvitation: 1 }));
    if (jobId) {
      navigate(`/recruiter/dashboard/candidates?jobId=${jobId}`);
    } else {
      navigate("/recruiter/dashboard/candidates");
    }
  };

  // Simple caret icon component for accordions
  const CaretIcon = ({ isOpen }) => (
    <svg
      className={`w-4 h-4 ml-2 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );

  // Reusable Accordion section component
  const AccordionSection = ({ title, isOpen, onClick, children }) => (
    <div className="border rounded-md mb-4 overflow-hidden">
      <button
        className="flex items-center justify-between w-full p-4 bg-transparent hover:bg-transparent transition-colors"
        onClick={onClick}
      >
        <span className="font-semibold text-sm md:text-base">{title}</span>
        <CaretIcon isOpen={isOpen} />
      </button>
      {isOpen && (
        <div className="p-4 text-sm text-gray-700 transition-all ease-in-out duration-200">
          {children}
        </div>
      )}
    </div>
  );
  const candidateTestSession = candidateTests.find(
    (test) => test.candidateId.toString() === id && test.jobId.toString() === jobId
  );
  return (
    <div className="p-6 bg-white rounded shadow-sm">
      <Link to="/recruiter/dashboard/candidates" className="text-blue-600 hover:underline inline-block mb-4 text-sm">
        &larr; Back to Candidates List
      </Link>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <h1 className="text-xl md:text-2xl font-bold">{name}</h1>
          <p className="text-gray-600 text-sm mb-2">{title}</p>
          <p className="text-sm text-gray-500">{candidateLocation}</p>
          <p className="text-sm text-gray-500 mb-2">{email}</p>
        </div>
        <div>
          {jobinvitation === 0 && (
            <button
              onClick={handleSendInvite}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Send Invitation
            </button>
          )}
        </div>
      </div>

      {/* Candidate Performance Card */}
      <div className="my-6">
        <CandidatePerformanceCard
          requiredSkills={requiredSkills}
          requiredExperience={requiredExperience}
          candidateSkills={skills || []}
          candidateExperience={totalExpObj.totalDuration}
          candidateExpObj={totalExpObj}
        />
      </div>

      {/* Interview Rounds Section */}
      <AccordionSection
        title="Interview Rounds"
        isOpen={showInterviewRounds}
        onClick={() => setShowInterviewRounds(!showInterviewRounds)}
      >
        {candidateTestSession && candidateTestSession.interviewRounds && candidateTestSession.interviewRounds.length > 0 ? (
          candidateTestSession.interviewRounds.map((round, index) => (
            <div key={index} className="mb-2">
              <strong>Round {index + 1}:</strong> Score: {round.score}%
            </div>
          ))
        ) : (
          <p>No interview rounds conducted yet.</p>
        )}
        <div className="mt-4">
          <p>
            <strong>Remaining Rounds:</strong>{" "}
            {candidateTestSession && candidateTestSession.roundsLeft != null
              ? candidateTestSession.roundsLeft
              : "N/A"}
          </p>
          <p>
            <strong>Overall Interview Score:</strong>{" "}
            {candidateTestSession && candidateTestSession.interviewScore != null
              ? candidateTestSession.interviewScore
              : "N/A"}%
          </p>
        </div>
        {candidateTestSession && candidateTestSession.interviewScore >= 70 && (
          <div className="mt-4">
            <button
              onClick={() =>
                navigate(`/recruiter/dashboard/interview?candidateId=${candidate.id}&jobId=${jobId}`)
              }
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              Schedule Interview
            </button>
          </div>
        )}
      </AccordionSection>

      {/* Other Accordion Sections */}
      <AccordionSection title="About" isOpen={showAbout} onClick={() => setShowAbout(!showAbout)}>
        {about || "No summary provided."}
      </AccordionSection>

      <AccordionSection title="Experience" isOpen={showExperience} onClick={() => setShowExperience(!showExperience)}>
        {Array.isArray(experience) && experience.length > 0 ? (
          <>
            {totalExpObj.totalDuration && (
              <div className="mb-4">
                <strong>Total Experience:</strong> {totalExpObj.totalDuration}
                <br />
                <em>{totalExpObj.overallRange}</em>
                {range && (
                  <p className="text-xs text-gray-600 mt-1">
                    Candidate meets {experienceRangeMatch}% of this job's experience range.
                  </p>
                )}
              </div>
            )}
            {experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-medium">{exp.role}</h3>
                <p className="text-gray-500 text-xs">
                  {exp.from} - {exp.to} &bull; {exp.location}
                </p>
                <p className="mt-1">{exp.description}</p>
              </div>
            ))}
          </>
        ) : (
          <p>
            {typeof experience === "string" ? totalExpObj.totalDuration : "No experience listed."}
          </p>
        )}
      </AccordionSection>

      <AccordionSection title="Skills" isOpen={showSkills} onClick={() => setShowSkills(!showSkills)}>
        {Array.isArray(skills) && skills.length > 0 ? skills.join(", ") : "No skills listed."}
      </AccordionSection>

      <AccordionSection title="Education" isOpen={showEducation} onClick={() => setShowEducation(!showEducation)}>
        {Array.isArray(education) && education.length > 0 ? (
          education.map((edu, i) => (
            <div key={i} className="mb-2">
              <strong>{edu.degree}</strong> — {edu.institution} ({edu.year})
            </div>
          ))
        ) : (
          <p>No education listed.</p>
        )}
      </AccordionSection>

      <AccordionSection title="Certifications" isOpen={showCertifications} onClick={() => setShowCertifications(!showCertifications)}>
        {Array.isArray(certifications) && certifications.length > 0 ? (
          certifications.map((cert, i) => (
            <div key={i} className="mb-2">
              <strong>{cert.title}</strong> — {cert.issuer} ({cert.year})
            </div>
          ))
        ) : (
          <p>No certifications listed.</p>
        )}
      </AccordionSection>

      <AccordionSection title="Resume" isOpen={showResume} onClick={() => setShowResume(!showResume)}>
        {resumeUrl ? (
          <div style={{ height: "800px" }}>
            <iframe src={resumeUrl} title="Candidate Resume" width="100%" height="100%" />
          </div>
        ) : (
          <p>No resume uploaded.</p>
        )}
      </AccordionSection>
    </div>
  );
};

export default CandidateDetail;
