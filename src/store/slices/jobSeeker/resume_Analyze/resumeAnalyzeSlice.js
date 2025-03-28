import { createSlice } from "@reduxjs/toolkit";

const resumeAnalyzerSlice = createSlice({
  name: "resumeAnalyzer",
  initialState: {
    resume: null,
    loading: false,
    error: null,
    analysis: null,
    resumeName: '',
  },
  reducers: {
    getResumeByIdRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getResumeByIdSuccess: (state, action) => {
      state.loading = false;
      state.resume = action.payload?.data;
    },
    getResumeByIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getResumeAnalysisRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.analysis = null;
    },
    getResumeAnalysisSuccess: (state, action) => {
      state.loading = false;
      state.analysis = action.payload?.data?.resume_json;
      state.resumeName = action.payload?.data?.resume_name;
      state.error = null;
    },
    getResumeAnalysisFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    

    clearResumeByIdState: (state) => {
      state.resume = null;
      state.error = null;
    },
  },
});

export const {
  getResumeByIdRequest,
  getResumeByIdSuccess,
  getResumeByIdFailure,
  getResumeAnalysisFailure,
  getResumeAnalysisRequest,
  getResumeAnalysisSuccess,
  clearResumeByIdState,
} = resumeAnalyzerSlice.actions;

export default resumeAnalyzerSlice.reducer;
