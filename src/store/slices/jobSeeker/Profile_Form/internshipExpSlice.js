import { createSlice } from "@reduxjs/toolkit";

// ✅ Initial State (No Local Storage)
const initialState = {
  status: false,
  message: "",
  loading: false,
  error: null,
  data: [], // Holds Internship Experience details from API
  tempInternshipDetails: [], // ✅ Temporary storage (only in Redux state)
};

const internshipExperienceSlice = createSlice({
  name: "internshipExperience",
  initialState,
  reducers: {
    // ✅ Add Temporary Internship Experience
    saveTempInternshipDetails: (state, action) => {
      state.tempInternshipDetails.push(action.payload);
    },

    // ✅ Edit Temporary Internship Experience
    editTempinternshipExperience: (state, action) => {
      const { index, updatedData } = action.payload;
      if (state.tempInternshipDetails[index]) {
        state.tempInternshipDetails[index] = updatedData; // ✅ Update existing entry
      }
    },

    // ✅ Delete Temporary Internship Experience
    deleteTempinternshipExperience: (state, action) => {
      state.tempInternshipDetails = state.tempInternshipDetails.filter(
        (_, i) => i !== action.payload
      );
    },

    // ✅ Clear All Temporary Internship Experience
    clearAlltempInternshipDetails: (state) => {
      state.tempInternshipDetails = [];
    },

    // ✅ GET Request Reducers
    getinternshipExperienceRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getinternshipExperienceSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.status = action.payload.status;
      // state.message = action.payload.message;
      state.error = null;
    },
    getinternshipExperienceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ ADD Request Reducers (Dispatch tempInternshipDetails directly)
    addinternshipExperienceRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addinternshipExperienceSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
      state.tempInternshipDetails = []; // ✅ Clear temp details after successful save
    },
    addinternshipExperienceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ UPDATE Request Reducers
    updateinternshipExperienceRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateinternshipExperienceSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    updateinternshipExperienceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ DELETE Request Reducers
    deleteinternshipExperienceRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteinternshipExperienceSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    deleteinternshipExperienceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearMessage: (state) => {
      state.message = ""; 
      state.status = false;
    }
  },
});

// ✅ Export Actions
export const {
  saveTempInternshipDetails,
  editTempinternshipExperience,
  deleteTempinternshipExperience,
  clearAlltempInternshipDetails,
  getinternshipExperienceRequest,
  getinternshipExperienceSuccess,
  getinternshipExperienceFailure,
  addinternshipExperienceRequest,
  addinternshipExperienceSuccess,
  addinternshipExperienceFailure,
  updateinternshipExperienceRequest,
  updateinternshipExperienceSuccess,
  updateinternshipExperienceFailure,
  deleteinternshipExperienceRequest,
  deleteinternshipExperienceSuccess,
  deleteinternshipExperienceFailure,
  clearMessage
} = internshipExperienceSlice.actions;

// ✅ Export Reducer
export default internshipExperienceSlice.reducer;
