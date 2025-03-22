// candidateSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  candidates: [],
  candidateTests: [], // NEW: holds candidate test sessions
  loading: false,
  error: null,
};

const candidateSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {
    fetchCandidatesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCandidatesSuccess: (state, action) => {
      state.loading = false;
      state.candidates = action.payload;
    },
    fetchCandidatesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCandidateInvitationRequest: (state) => {
      state.loading = true;
    },
    updateCandidateInvitationSuccess: (state, action) => {
      state.loading = false;
      const updatedCandidate = action.payload;
      state.candidates = state.candidates.map((cand) =>
        cand.id === updatedCandidate.id ? updatedCandidate : cand
      );
    },
    updateCandidateInvitationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // New actions for applying for a job (creates a test session)
    applyForJobRequest: (state) => {
      state.loading = true;
    },
    applyForJobSuccess: (state, action) => {
      state.loading = false;
    },
    applyForJobFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // NEW: Actions for fetching candidate tests
    fetchCandidateTestsRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    fetchCandidateTestsSuccess: (state, action) => {
      state.loading = false;
      state.candidateTests = action.payload;
    },
    fetchCandidateTestsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCandidatesRequest,
  fetchCandidatesSuccess,
  fetchCandidatesFailure,
  updateCandidateInvitationRequest,
  updateCandidateInvitationSuccess,
  updateCandidateInvitationFailure,
  applyForJobRequest,
  applyForJobSuccess,
  applyForJobFailure,
  fetchCandidateTestsRequest,     // NEW
  fetchCandidateTestsSuccess,     // NEW
  fetchCandidateTestsFailure,     // NEW
} = candidateSlice.actions;

export default candidateSlice.reducer;
