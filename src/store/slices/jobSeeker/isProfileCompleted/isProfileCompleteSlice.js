import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isComplete: false, // ✅ Boolean indicating profile completion
  loading: false,
  error: null,
  message: null,
};

const checkProfileCompleteSlice = createSlice({
  name: "checkProfileComplete",
  initialState,
  reducers: {
    // ✅ GET Request Reducers
    checkProfileCompleteRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    checkProfileCompleteSuccess: (state, action) => {
      state.loading = false;
      state.isComplete = action.payload.status; // ✅ Set profile completion status
      state.message = action.payload.message || "";
      state.error = null;
    },
    checkProfileCompleteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isComplete = false; // Default to false in case of failure
    },
    clearProfileCheckMessage: (state) => {
      state.message = null;
    },
  },
});

// ✅ Export Actions
export const {
  checkProfileCompleteRequest,
  checkProfileCompleteSuccess,
  checkProfileCompleteFailure,
  clearProfileCheckMessage,
} = checkProfileCompleteSlice.actions;

export default checkProfileCompleteSlice.reducer;
