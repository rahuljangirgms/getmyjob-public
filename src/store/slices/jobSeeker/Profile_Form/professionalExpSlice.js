import { createSlice } from "@reduxjs/toolkit";

// ✅ Initial State (No Local Storage)
const initialState = {
  status: false,
  message: "",
  loading: false,
  error: null,
  data: [], // Holds professional experience details from API
  tempProfessionalDetails: [], // ✅ Temporary storage (only in Redux state)
};

const professionalExperienceSlice = createSlice({
  name: "professionalExperience",
  initialState,
  reducers: {
    // ✅ Add Temporary Professional Experience
    saveTempProfessionalDetails: (state, action) => {
      state.tempProfessionalDetails.push(action.payload);
    },

    // ✅ Edit Temporary Professional Experience
    editTempProfessionalExperience: (state, action) => {
      const { index, updatedData } = action.payload;
      if (state.tempProfessionalDetails[index]) {
        state.tempProfessionalDetails[index] = updatedData; // ✅ Update existing entry
      }
    },

    // ✅ Delete Temporary Professional Experience
    deleteTempProfessionalExperience: (state, action) => {
      state.tempProfessionalDetails = state.tempProfessionalDetails.filter(
        (_, i) => i !== action.payload
      );
    },

    // ✅ Clear All Temporary Professional Experience
    clearAllTempProfessionalDetails: (state) => {
      state.tempProfessionalDetails = [];
    },

    // ✅ GET Request Reducers
    getProfessionalExperienceRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getProfessionalExperienceSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.status = action.payload.status;
      // state.message = action.payload.message;
      state.error = null;
    },
    getProfessionalExperienceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ ADD Request Reducers (Dispatch tempProfessionalDetails directly)
    addProfessionalExperienceRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addProfessionalExperienceSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
      state.tempProfessionalDetails = []; // ✅ Clear temp details after successful save
    },
    addProfessionalExperienceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ UPDATE Request Reducers
    updateProfessionalExperienceRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProfessionalExperienceSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    updateProfessionalExperienceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ DELETE Request Reducers
    deleteProfessionalExperienceRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteProfessionalExperienceSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    deleteProfessionalExperienceFailure: (state, action) => {
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
  saveTempProfessionalDetails,
  editTempProfessionalExperience,
  deleteTempProfessionalExperience,
  clearAllTempProfessionalDetails,
  getProfessionalExperienceRequest,
  getProfessionalExperienceSuccess,
  getProfessionalExperienceFailure,
  addProfessionalExperienceRequest,
  addProfessionalExperienceSuccess,
  addProfessionalExperienceFailure,
  updateProfessionalExperienceRequest,
  updateProfessionalExperienceSuccess,
  updateProfessionalExperienceFailure,
  deleteProfessionalExperienceRequest,
  deleteProfessionalExperienceSuccess,
  deleteProfessionalExperienceFailure,
  clearMessage
} = professionalExperienceSlice.actions;

// ✅ Export Reducer
export default professionalExperienceSlice.reducer;
