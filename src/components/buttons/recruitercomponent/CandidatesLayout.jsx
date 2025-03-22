import React, { useState, useEffect } from "react";
import CandidateDetail from "./CandidateDetail";
import { useSelector, useDispatch } from "react-redux";
import { fetchCandidatesRequest } from "../../store/slices/candidateSlice";

export default function CandidatesLayout() {
  const dispatch = useDispatch();
  const { candidates, loading, error } = useSelector((state) => state.candidates);

  // Store the currently selected candidate’s ID in state.
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);

  useEffect(() => {
    // Fetch the candidate list if we haven’t yet
    dispatch(fetchCandidatesRequest({}));
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading candidates: {error}</p>;

  return (
    <div className="flex h-screen">
      {/* Left Column: scrollable list of candidates */}
      <div className="w-1/4 border-r p-4 overflow-y-auto bg-white">
        <h2 className="text-lg font-semibold mb-4">Candidates</h2>
        {candidates.map((cand) => (
          <button
            key={cand.id}
            onClick={() => setSelectedCandidateId(cand.id)}
            className="block w-full text-left mb-2 p-2 border rounded hover:bg-gray-100"
          >
            <h3 className="font-medium">{cand.name}</h3>
            <p className="text-sm text-gray-500">{cand.title}</p>
            <p className="text-sm text-gray-400">{cand.location}</p>
          </button>
        ))}
      </div>

      {/* Right Column: Candidate detail */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {selectedCandidateId ? (
          <CandidateDetail candidateId={selectedCandidateId} />
        ) : (
          <div className="text-center text-gray-500">
            <p>Select a candidate from the list</p>
          </div>
        )}
      </div>
    </div>
  );
}
