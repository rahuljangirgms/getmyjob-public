import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  loading: false,
  error: null,
  status: false,
  message: "",
};

const EducationInfoSlice = createSlice({
  name: "jobSeekerEducationInfo",
  initialState,
  reducers: {
    // ✅ POST EducationInfo Reducers
    postEducationInfoRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    postEducationInfoSuccess: (state, action) => {
      console.log("POST Success Data:", action.payload); // Debugging
      state.loading = false;
      state.data = action.payload; // Ensure correct assignment
      state.error = null;
    },
    postEducationInfoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ GET EducationInfo Reducers
    getEducationInfoRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getEducationInfoSuccess: (state, action) => {
      console.log("GET Success Data:", action.payload); // Debugging
      state.loading = false;
      state.data = action.payload?.data || null; // ✅ Ensure valid data assignment
      state.status = action.payload?.status || false;
      state.message = action.payload?.message || "";
      state.error = null;
    },
    getEducationInfoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  postEducationInfoRequest,
  postEducationInfoFailure,
  postEducationInfoSuccess,

  getEducationInfoFailure,
  getEducationInfoRequest,
  getEducationInfoSuccess,
} = EducationInfoSlice.actions;

export default EducationInfoSlice.reducer;
