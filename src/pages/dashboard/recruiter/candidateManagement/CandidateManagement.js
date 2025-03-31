import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCandidatesRequest, fetchOpentoworkCandidatesRequest } from "../../../../store/slices/recruiter/candidateSlice";
import { fetchJobsRequest } from "../../../../store/slices/recruiter/jobSlice";

// Helper functions remain unchanged
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

function calculateTotalExperience(experienceArray) {
  if (!Array.isArray(experienceArray) || experienceArray.length === 0) {
    return { totalMonths: 0, totalYearsFloat: 0 };
  }
  let totalMonths = 0;
  experienceArray.forEach((exp) => {
    const startDate = new Date(exp.from);
    const endDate = exp.to.toLowerCase() === "present" ? new Date() : new Date(exp.to);
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
    totalMonths += months;
  });
  return { totalMonths, totalYearsFloat: totalMonths / 12 };
}

const CandidateManagement = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Get query params if available
  const searchParams = new URLSearchParams(location.search);
  const openToWorkQuery = searchParams.get("openToWork") === "true";
  const jobId = searchParams.get("jobId");
  const bashId = searchParams.get("bash_id");
  // Local state for additional client-side filters
  // const [skillsFilter, setSkillsFilter] = useState("");
  // const [experienceFilter, setExperienceFilter] = useState("");
  // const [nameFilter, setNameFilter] = useState("");
  // const [emailFilter, setEmailFilter] = useState("");
  // const [minRoundsFilter, setMinRoundsFilter] = useState("");
  // const [minScoreFilter, setMinScoreFilter] = useState("");
  // New filters added:
  // const [openToWorkFilter, setOpenToWorkFilter] = useState(""); // "" means no filtering
  // const [jobAppliedFilter, setJobAppliedFilter] = useState("");

  // const { candidates, loading, error } = useSelector((state) => state.candidates);
  // const { jobs } = useSelector((state) => state.jobs) || {};
  // const allJobs = [...(jobs?.activeJobs || []), ...(jobs?.draftJobs || []), ...(jobs?.expiredJobs || [])];
  // console.log("candidate==========>",candidates)

  // Fetch candidates and jobs regardless of jobId
  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const jobId = searchParams.get("jobId");
  //   const bashId = searchParams.get("bash_id");
    
  //   // Dispatch the fetch candidates action with job_id and bash_id if available
  //   if (jobId && bashId) {
  //     dispatch(fetchCandidatesRequest({ job_id: jobId, bash_id: bashId }));
  //   } else {
  //     dispatch(fetchCandidatesRequest());
  //   }
  // }, [dispatch, location.search]);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  // const matchedJob = jobId ? allJobs.find((j) => j.id === parseInt(jobId)) : null;
  // let requiredRange = null;
  // if (matchedJob && matchedJob.experience) {
  //   requiredRange = parseExperienceRange(matchedJob.experience);
  // }

  // Filter candidates:
  // const filteredCandidates = candidates.filter((candidate) => {
  //   let meetsJobExperience = true;
  //   if (requiredRange) {
  //     let candidateTotalMonths = 0;
  //     if (Array.isArray(candidate.experience) && candidate.experience.length > 0) {
  //       candidateTotalMonths = calculateTotalExperience(candidate.experience).totalMonths;
  //     } else if (typeof candidate.experience === "string") {
  //       candidateTotalMonths = parseFloat(candidate.experience) * 12;
  //     }
  //     const { lowerMonths, upperMonths } = requiredRange;
  //     if (candidateTotalMonths < lowerMonths || (upperMonths !== Infinity && candidateTotalMonths > upperMonths)) {
  //       meetsJobExperience = false;
  //     }
  //   }

  //   let meetsSkillFilter = true;
  //   if (skillsFilter) {
  //     const skillQuery = skillsFilter.toLowerCase();
  //     meetsSkillFilter =
  //       candidate.skills && candidate.skills.some((skill) => skill.toLowerCase().includes(skillQuery));
  //   }

  //   let meetsUserExpFilter = true;
  //   if (experienceFilter) {
  //     const minExp = parseFloat(experienceFilter) || 0;
  //     let candidateYearsFloat = 0;
  //     if (Array.isArray(candidate.experience) && candidate.experience.length > 0) {
  //       candidateYearsFloat = calculateTotalExperience(candidate.experience).totalYearsFloat;
  //     } else if (typeof candidate.experience === "string") {
  //       candidateYearsFloat = parseFloat(candidate.experience) || 0;
  //     }
  //     if (candidateYearsFloat < minExp) meetsUserExpFilter = false;
  //   }

  //   let meetsJobApplication = true;
  //   // If query param jobId exists, filter by it first.
  //   // if (jobId) {
  //   //   meetsJobApplication = candidate.appliedJobs?.includes(parseInt(jobId));
  //   // }
  //   // Then, if the job applied filter is set, ensure the candidate has applied to that job ID.
  //   if (jobAppliedFilter) {
  //     meetsJobApplication = meetsJobApplication && candidate.appliedJobs?.includes(parseInt(jobAppliedFilter));
  //   }

  //   let meetsNameFilter = true;
  //   if (nameFilter) {
  //     meetsNameFilter = candidate.name && candidate.name.toLowerCase().includes(nameFilter.toLowerCase());
  //   }

  //   let meetsEmailFilter = true;
  //   if (emailFilter) {
  //     meetsEmailFilter = candidate.email && candidate.email.toLowerCase().includes(emailFilter.toLowerCase());
  //   }

  //   let meetsRoundsFilter = true;
  //   if (minRoundsFilter) {
  //     const minRounds = parseInt(minRoundsFilter);
  //     meetsRoundsFilter = candidate.roundsLeft != null && candidate.roundsLeft >= minRounds;
  //   }

  //   let meetsScoreFilter = true;
  //   if (minScoreFilter) {
  //     const minScore = parseFloat(minScoreFilter);
  //     meetsScoreFilter = candidate.interviewScore != null && candidate.interviewScore >= minScore;
  //   }

  //   let meetsOpenToWorkFilter = true;
  //   if (openToWorkFilter !== "") {
  //     // Compare with the string value ("true" or "false")
  //     meetsOpenToWorkFilter = candidate.openToWork === (openToWorkFilter === "true");
  //   }

  //   return (
  //     meetsJobExperience &&
  //     meetsSkillFilter &&
  //     meetsUserExpFilter &&
  //     meetsJobApplication &&
  //     meetsNameFilter &&
  //     meetsEmailFilter &&
  //     meetsRoundsFilter &&
  //     meetsScoreFilter &&
  //     meetsOpenToWorkFilter
  //   );
  // });

// Grab candidates and jobs from Redux
const { candidates, loading, error } = useSelector((state) => state.candidates);
const { jobs } = useSelector((state) => state.jobs) || {};
const allJobs = [
  ...(jobs?.activeJobs || []),
  ...(jobs?.draftJobs || []),
  ...(jobs?.expiredJobs || []),
];

// Fetch candidates (with job_id & bash_id if available)
useEffect(() => {
  if (jobId && bashId) {
    if (openToWorkQuery) {
      dispatch(fetchOpentoworkCandidatesRequest({ job_id: jobId, bash_id: bashId }));
    } else {
      dispatch(fetchCandidatesRequest({ job_id: jobId, bash_id: bashId }));
    }
  } else {
    dispatch(fetchCandidatesRequest());
  }
}, [dispatch, jobId, bashId, openToWorkQuery]);

// Loading / Error states
if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error}</p>;

return (
  <div className="p-6 max-w-full mx-auto">
    <h1 className="text-xl font-bold mb-4">Candidates</h1>

    {jobId ? (
      <p className="mb-4">Displaying candidates for job ID: {jobId}</p>
    ) : (
      <p className="mb-4">Showing all candidates</p>
    )}

    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100 text-gray-700">
          <th className="p-4 text-left">Name</th>
          <th className="p-4 text-left">Email</th>
          <th className="p-4 text-left">Skills</th>
          <th className="p-4 text-left">Experience (Years)</th>
          <th className="p-4 text-left">Open to Work</th>
          <th className="p-4 text-left">Job(s) Applied</th>
          <th className="p-4 text-left">Rounds Left</th>
          <th className="p-4 text-left">Score</th>
          {!openToWorkQuery && <th className="p-4 text-left">Schedule Interview</th>}
        </tr>
      </thead>
      <tbody>
        {candidates.length === 0 ? (
          <tr>
            <td colSpan={!openToWorkQuery ? 9 : 8} className="p-4 text-center">
              <div className="flex flex-col items-center justify-center py-6">
                <img
                  src="/assets/no-candidates.png"
                  alt="No candidates"
                  className="w-48 h-48 mb-4 object-contain"
                />
                <p className="text-gray-500 text-sm">No candidates found.</p>
              </div>
            </td>
          </tr>
        ) : (
          candidates.map((candidate) => {
            // We’ll just display candidate.total_year_exp or total_month_exp
            // from your data if you have it, or fallback to "N/A".
            const expYears = candidate.total_year_exp ?? "N/A";

            return (
              <tr key={candidate.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4">
                <Link
    to={`/recruiter/dashboard/candidates/detail/${candidate.id}?jobId=${jobId}`}
    className="font-medium text-blue-600 hover:underline"
  >
    {candidate.name}
  </Link>
                </td>
                <td className="p-4">{candidate.email}</td>
                <td className="p-4">
                  {Array.isArray(candidate.skills)
                    ? candidate.skills.join(", ")
                    : "N/A"}
                </td>
                <td className="p-4">{expYears}</td>
                <td className="p-4">
                  {candidate.open_to_work ? (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded">True</span>
                  ) : (
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">False</span>
                  )}
                </td>
                <td className="p-4">
  {candidate.application_status ? (
    <span className="text-green-600 font-semibold">
      {candidate.application_status}
    </span>
  ) : (
    <span className="text-gray-500">N/A</span>
  )}
</td>
                <td className="p-4">
                  {candidate.roundsLeft != null ? candidate.roundsLeft : "N/A"}
                </td>
                <td className="p-4">
                  {candidate.interviewScore != null ? candidate.interviewScore : "N/A"}
                </td>
                {!openToWorkQuery && (
                  <td className="p-4">
                    <button
                      onClick={() =>
                        navigate(
                          `/recruiter/dashboard/interview?candidateId=${candidate.id}&jobId=${jobId}`
                        )
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      Schedule Interview
                    </button>
                  </td>
                )}
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  </div>
);
};
export default CandidateManagement;
