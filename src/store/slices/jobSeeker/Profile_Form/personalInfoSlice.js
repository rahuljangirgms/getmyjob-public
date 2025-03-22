import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
  status: false,
  message: "",
};

const personalInfoSlice = createSlice({
  name: "jobSeekerPersonalInfo",
  initialState,
  reducers: {
    // ✅ POST personalInfo Reducers
    postpersonalInfoRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    postpersonalInfoSuccess: (state, action) => {
      console.log("POST Success Data:", action.payload); // Debugging
      state.loading = false;
      state.data = action.payload; // Ensure correct assignment
      state.error = null;
    },
    postpersonalInfoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ GET personalInfo Reducers
    getpersonalInfoRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getpersonalInfoSuccess: (state, action) => {
      console.log("GET Success Data:", action.payload); // Debugging
      state.loading = false;
      state.data = action.payload?.data || null; // ✅ Ensure valid data assignment
      state.status = action.payload?.status || false;
      state.message = action.payload?.message || "";
      state.error = null;
    },
    getpersonalInfoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  postpersonalInfoRequest,
  postpersonalInfoSuccess,
  postpersonalInfoFailure,
  getpersonalInfoRequest,
  getpersonalInfoSuccess,
  getpersonalInfoFailure,
} = personalInfoSlice.actions;

export default personalInfoSlice.reducer;
