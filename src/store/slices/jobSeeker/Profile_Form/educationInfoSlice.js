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
    // POST EducationInfo Reducers
    postEducationInfoRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    postEducationInfoSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload?.message || "Education Added Successfully"; 
      state.status = true;  // ✅ Ensure status is only set once
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
      // state.message = action.payload?.message || "";
      state.error = null;
    },
    getEducationInfoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update Educations Data 
    updateEducationInfoRequest:(state) =>{
      state.loading = true;
      state.error = null;
    },
    updateEducationInfoSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload?.data || state.data; 
      state.message = action.payload?.message || "Education info updated successfully!";
      state.status = true; // ✅ Ensure status is true to trigger toast
      state.error = null;
    },
    updateEducationInfoFailure: (state,action) =>{
      state.loading = false;
      state.error = action.payload;
    },


    // Delete Education Data 
    deleteEducationRequest:(state)=>{
      state.loading = true;
      state.error = null;
    },
    deleteEducationSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload?.message || "Education record deleted successfully!";
      state.status = true; // ✅ Ensure status is true to trigger toast
      state.error = null;
    },
    deleteEducationFailure: (state, action) =>{
      state.loading = false;
      state.error = action.payload;
    },

    clearMessage: (state) => {
      state.message = ""; 
      state.status = false;
    }

  },
});

export const {
  postEducationInfoRequest,
  postEducationInfoFailure,
  postEducationInfoSuccess,

  getEducationInfoFailure,
  getEducationInfoRequest,
  getEducationInfoSuccess,

  updateEducationInfoFailure,
  updateEducationInfoRequest,
  updateEducationInfoSuccess,

  deleteEducationFailure,
  deleteEducationRequest,
  deleteEducationSuccess,

  clearMessage

} = EducationInfoSlice.actions;

export default EducationInfoSlice.reducer;
