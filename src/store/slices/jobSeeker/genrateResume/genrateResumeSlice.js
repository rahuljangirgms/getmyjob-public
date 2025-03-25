import { createSlice } from "@reduxjs/toolkit";

const genrateResumeSlice = createSlice({
  name: "resume",
  initialState: {
    loading: false,
    error: null,
    resumes: [],
    message: null,
    status: false, // ✅ added
  },
  reducers: {
    // POST Resume
    uploadResumeRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.status = false;
    },
    uploadResumeSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.status = action.payload.status ?? true; // ✅ default to true if not provided
    },
    uploadResumeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.status = false;
    },

    // GET Resumes
    getResumeListRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.status = false;
    },
    getResumeListSuccess: (state, action) => {
      state.loading = false;
      state.resumes = action.payload.data || action.payload; // support both raw array or wrapped
      state.status = action.payload.status ?? true;
    },
    getResumeListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.status = false;
    },


    deleteResumeRequest: (state,action) =>{
      state.loading = true;
      state.error = null;
      state.status = false;
    },
    deleteResumeSuccsess: (state,action) =>{
      state.loading = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    deleteResumeFailure: (state,action) =>{
      state.loading = false;
      state.error = action.payload;
      state.status = false;
    },


    clearResumeMessages: (state) => {
      state.message = null;
      state.error = null;
      state.status = false;
    },
  },
});

export const {
  uploadResumeRequest,
  uploadResumeSuccess,
  uploadResumeFailure,
  getResumeListRequest,
  getResumeListSuccess,
  getResumeListFailure,
  deleteResumeFailure,
  deleteResumeRequest,
  deleteResumeSuccsess,
  clearResumeMessages,
} = genrateResumeSlice.actions;

export default genrateResumeSlice.reducer;
