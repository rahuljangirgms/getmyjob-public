import { createSlice } from "@reduxjs/toolkit";

// ✅ Initial State (No Local Storage)
const initialState = {
  status: false,
  message: "",
  loading: false,
  error: null,
  data: [], // Holds Project Experience details from API
  tempProjectDetails: [], // ✅ Temporary storage (only in Redux state)
};

const projectExperienceSlice = createSlice({
  name: "projectExperience",
  initialState,
  reducers: {
    // ✅ Add Temporary Project Experience
    saveTempProjectDetails: (state, action) => {
      state.tempProjectDetails.push(action.payload);
    },

    // ✅ Edit Temporary Project Experience
    editTempProjectExperience: (state, action) => {
      const { index, updatedData } = action.payload;
      if (state.tempProjectDetails[index]) {
        state.tempProjectDetails[index] = updatedData; // ✅ Update existing entry
      }
    },

    // ✅ Delete Temporary Project Experience
    deleteTempProjectExperience: (state, action) => {
      state.tempProjectDetails = state.tempProjectDetails.filter(
        (_, i) => i !== action.payload
      );
    },

    // ✅ Clear All Temporary Project Experience
    clearAllTempProjectDetails: (state) => {
      state.tempProjectDetails = [];
    },

    // ✅ GET Request Reducers
    getProjectExperienceRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getProjectExperienceSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.status = action.payload.status;
      state.error = null;
    },
    getProjectExperienceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ ADD Request Reducers (Dispatch tempProjectDetails directly)
    addProjectExperienceRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addProjectExperienceSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
      state.tempProjectDetails = []; // ✅ Clear temp details after successful save
    },
    addProjectExperienceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ UPDATE Request Reducers
    updateProjectExperienceRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProjectExperienceSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    updateProjectExperienceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ DELETE Request Reducers
    deleteProjectExperienceRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteProjectExperienceSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    deleteProjectExperienceFailure: (state, action) => {
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
  saveTempProjectDetails,
  editTempProjectExperience,
  deleteTempProjectExperience,
  clearAllTempProjectDetails,
  getProjectExperienceRequest,
  getProjectExperienceSuccess,
  getProjectExperienceFailure,
  addProjectExperienceRequest,
  addProjectExperienceSuccess,
  addProjectExperienceFailure,
  updateProjectExperienceRequest,
  updateProjectExperienceSuccess,
  updateProjectExperienceFailure,
  deleteProjectExperienceRequest,
  deleteProjectExperienceSuccess,
  deleteProjectExperienceFailure,
  clearMessage
} = projectExperienceSlice.actions;

// ✅ Export Reducer
export default projectExperienceSlice.reducer;
