import React from "react";
import stringSimilarity from "string-similarity";

// Helper function for experience range parsing
function parseExperienceRange(requiredExperience) {
  if (typeof requiredExperience !== "string") return null;
  
  if (requiredExperience === "30+ years") {
    return { lowerMonths: 360, upperMonths: Infinity }; // 30+ years treated as 360 months
  }

  const yearsMatch = requiredExperience.match(/^(\d+)\s*year[s]?$/i);
  if (yearsMatch) {
    const years = parseInt(yearsMatch[1], 10);
    return { lowerMonths: years * 12, upperMonths: years * 12 }; // Convert years to months
  }

  const parts = requiredExperience.split("-");
  if (parts.length === 2) {
    const lowerYears = parseFloat(parts[0]) || 0;
    const upperYears = parseFloat(parts[1]) || 0;
    return { lowerMonths: lowerYears * 12, upperMonths: upperYears * 12 };
  }

  return null;
}


// Calculate experience match score
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

// Calculate job description match score
function calculateJobDescriptionMatch(jobDescription, candidateAbout) {
  if (!jobDescription || !candidateAbout) return 0;
  const similarity = stringSimilarity.compareTwoStrings(
    jobDescription.toLowerCase(),
    candidateAbout.toLowerCase()
  );
  return Math.round(similarity * 100);
}

// Calculate overall match score
function calculateOverallScore(skillScore, experienceScore, jobDescScore) {
  return Math.round((skillScore + experienceScore + jobDescScore) / 3);
}

// Calculate skill match score
function calculateSkillScore(requiredSkills, candidateSkills) {
  if (!requiredSkills.length) return 100;
  const matchingSkills = candidateSkills.filter((skill) =>
    requiredSkills.includes(skill)
  );
  const score = matchingSkills.length * 20;
  return Math.min(score, 100);
}

// Updated calculateTotalExperience function to handle new format
function calculateTotalExperience(experienceArray) {
  if (!experienceArray || experienceArray.length === 0) return { totalMonths: 0, totalDuration: "", overallRange: "" };

  let totalMonths = 0;
  let earliestStart = null;
  let latestEnd = null;

  experienceArray.forEach((exp) => {
    const startDate = new Date(exp.from);
    const endDate =
      exp.to && typeof exp.to === "string"
        ? (exp.to.toLowerCase() === "present" ? new Date() : new Date(exp.to))
        : new Date();

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

// Updated CandidatePerformanceCard to use new experience logic
const CandidatePerformanceCard = ({
  requiredSkills = [],
  requiredExperience = "",
  candidateSkills = [],
  candidateExperience = "",
  candidateExpObj = null,
  jobDescription = "",
  candidateAbout = "",
}) => {
  // Skill match
  const skillScore = calculateSkillScore(requiredSkills, candidateSkills);

  // Experience match
  const range = parseExperienceRange(requiredExperience);
  let experienceScore = 0;
  if (range && candidateExpObj && typeof candidateExpObj.totalMonths === "number") {
    experienceScore = partialExperienceScore(
      candidateExpObj.totalMonths,
      range.lowerMonths,
      range.upperMonths
    );
  }

  // Job description match
  const jobDescScore = calculateJobDescriptionMatch(jobDescription, candidateAbout);

  // Overall score
  const overallScore = calculateOverallScore(skillScore, experienceScore, jobDescScore);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-semibold mb-2">Candidate Performance</h3>
      <p className="text-sm mb-1">
        <strong>Skill Match:</strong> {skillScore}%
      </p>
      <p className="text-sm mb-1">
        <strong>Experience Match:</strong> {experienceScore}%
      </p>
      <p className="text-sm mb-1">
        <strong>Job Description Match:</strong> {jobDescScore}%
      </p>
      <p className="text-sm mb-2">
        <strong>Overall Match:</strong> {overallScore}%
      </p>
      <div className="w-full bg-gray-300 rounded-full h-4">
        <div
          className="bg-blue-600 h-4 rounded-full"
          style={{ width: `${overallScore}%` }}
        />
      </div>
    </div>
  );
};

// export default CandidatePerformanceCard;

export default CandidatePerformanceCard;
