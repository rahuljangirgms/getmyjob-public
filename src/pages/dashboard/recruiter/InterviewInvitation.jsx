// src/pages/dashboard/recruiter/InterviewInvitation.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const InterviewInvitation = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const candidateId = searchParams.get("candidateId"); // candidateId passed via URL

  // Retrieve candidates from Redux store and find the candidate by id
  const candidates = useSelector((state) => state.candidates.candidates);
  const candidate = candidates.find(
    (cand) => cand.id.toString() === candidateId
  );

  // We'll use the candidate name from redux; if not found, fallback to an empty string
  const candidateName = candidate ? candidate.name : "";

  // Set default round type to "mcq" for first round
  const [roundType, setRoundType] = useState("mcq");
  const [inviteLink, setInviteLink] = useState("");

  // Dummy token generator (replace with your backend logic)
  const generateUniqueToken = () =>
    Math.random().toString(36).substr(2, 9);

  const sendInvite = () => {
    const token = generateUniqueToken();
    // Generate the invite link including roundType and candidateName
    const link = `${window.location.origin}/jobseeker/interview/${token}?round=${roundType}&candidateName=${encodeURIComponent(candidateName)}`;
    setInviteLink(link);
    console.log("Invite link generated:", link);
    // Here you could also update the candidate’s record in your JSON server (using a PATCH request)
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Send Interview Invite</h1>
      {candidate ? (
        <div className="mb-4">
          <p className="font-medium">Candidate Name:</p>
          <p>{candidateName}</p>
        </div>
      ) : (
        <div className="mb-4">
          <p className="text-red-600">Candidate not found.</p>
        </div>
      )}
      <div className="mb-4">
        <label className="block mb-1">Select Interview Round Type</label>
        <select
          value={roundType}
          onChange={(e) => setRoundType(e.target.value)}
          className="border rounded p-2 w-full"
        >
          <option value="mcq">MCQ (First Round)</option>
          <option value="technical">Technical (Coding Round)</option>
        </select>
      </div>
      <button
        onClick={sendInvite}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Generate Invite Link
      </button>
      {inviteLink && (
        <div className="mt-4">
          <p className="font-medium">Invite Link:</p>
          <a href={inviteLink} className="text-blue-600 hover:underline">
            {inviteLink}
          </a>
        </div>
      )}
    </div>
  );
};

export default InterviewInvitation;
