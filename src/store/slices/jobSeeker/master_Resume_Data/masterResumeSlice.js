import { createSlice } from "@reduxjs/toolkit";

// ✅ Initial State (No Local Storage)
const initialState = {
  status: false,
  message: "",
  loading: false,
  error: null,
  data: null, // Holds Master Resume details from API
};

const masterResumeSlice = createSlice({
  name: "masterResume",
  initialState,
  reducers: {
    // ✅ GET Request Reducers
    getMasterResumeRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getMasterResumeSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.error = null;
    },
    getMasterResumeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearMessage: (state) => {
      state.message = "";
      state.status = false;
    },
  },
});

// ✅ Export Actions
export const {
  getMasterResumeRequest,
  getMasterResumeSuccess,
  getMasterResumeFailure,
  clearMessage,
} = masterResumeSlice.actions;

// ✅ Export Reducer
export default masterResumeSlice.reducer;
