import React from "react";
import stringSimilarity from "string-similarity";

// ------------------
// 1) Convert a required experience range string (e.g., "0-1", "5-8", "10-above")
// ------------------
function parseExperienceRange(requiredExperience) {
  if (typeof requiredExperience !== "string") return null;
  if (requiredExperience === "10-above") {
    return { lowerMonths: 120, upperMonths: Infinity };
  }
  const parts = requiredExperience.split("-");
  if (parts.length !== 2) return null;
  const lowerYears = parseFloat(parts[0]) || 0;
  const upperYears = parseFloat(parts[1]) || 0;
  return {
    lowerMonths: lowerYears * 12,
    upperMonths: upperYears * 12,
  };
}

// ------------------
// 2) Partial scoring logic for experience match
// ------------------
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

// ------------------
// 3) Calculate total experience from an array of experiences
// ------------------
function calculateTotalExperience(experienceArray) {
  if (!Array.isArray(experienceArray) || experienceArray.length === 0) {
    return { totalMonths: 0, totalYearsFloat: 0 };
  }
  let totalMonths = 0;
  experienceArray.forEach((exp) => {
    const startDate = new Date(exp.from);
    const endDate =
      typeof exp.to === "string" && exp.to.toLowerCase() === "present"
        ? new Date()
        : new Date(exp.to);
    totalMonths += (endDate.getFullYear() - startDate.getFullYear()) * 12 +
                   (endDate.getMonth() - startDate.getMonth());
  });
  return { totalMonths, totalYearsFloat: totalMonths / 12 };
}

// ------------------
// 4) Calculate a simple job description match percentage
// ------------------
function calculateJobDescriptionMatch(jobDescription, candidateAbout) {
  // If either string is missing, assume no match
  if (!jobDescription || !candidateAbout) return 0;
  // Use string-similarity to get a similarity score between 0 and 1
  const similarity = stringSimilarity.compareTwoStrings(
    jobDescription.toLowerCase(),
    candidateAbout.toLowerCase()
  );
  return Math.round(similarity * 100);
}

// ------------------
// 5) Overall candidate performance score
// ------------------
function calculateOverallScore(skillScore, experienceScore, jobDescScore) {
  // You could take a simple average or weight the scores differently.
  // Here, we'll take a simple average of all three.
  return Math.round((skillScore + experienceScore + jobDescScore) / 3);
}

// ------------------
// 6) Calculate the skill match score
// Each matching skill contributes 20% score, capped at 100%
function calculateSkillScore(requiredSkills, candidateSkills) {
  if (!requiredSkills.length) return 100;
  const matchingSkills = candidateSkills.filter((skill) =>
    requiredSkills.includes(skill)
  );
  const score = matchingSkills.length * 20;
  return Math.min(score, 100);
}

const CandidatePerformanceCard = ({
  requiredSkills = [],
  requiredExperience = "",
  candidateSkills = [],
  candidateExperience = "",
  candidateExpObj = null, // { totalMonths, totalDuration, overallRange }
  jobDescription = "",  // New prop: job description text from the job
  candidateAbout = "",  // New prop: candidate's about text to compare against job description
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

  // Job description match (using candidateAbout and jobDescription)
  const jobDescScore = calculateJobDescriptionMatch(jobDescription, candidateAbout);

  // Overall score is an average of skillScore, experienceScore, and jobDescScore
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

export default CandidatePerformanceCard;
