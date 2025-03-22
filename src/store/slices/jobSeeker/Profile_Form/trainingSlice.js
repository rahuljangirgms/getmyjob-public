import { createSlice } from "@reduxjs/toolkit";

// ✅ Initial State (No Local Storage)
const initialState = {
  status: false,
  message: "",
  loading: false,
  error: null,
  data: [], // Holds Training details from API
  tempTrainingDetails: [], // ✅ Temporary storage (only in Redux state)
};

const trainingSlice = createSlice({
  name: "training",
  initialState,
  reducers: {
    // ✅ Add Temporary Training
    saveTempTrainingDetails: (state, action) => {
      state.tempTrainingDetails.push(action.payload);
    },

    // ✅ Edit Temporary Training
    editTempTraining: (state, action) => {
      const { index, updatedData } = action.payload;
      if (state.tempTrainingDetails[index]) {
        state.tempTrainingDetails[index] = updatedData; // ✅ Update existing entry
      }
    },

    // ✅ Delete Temporary Training
    deleteTempTraining: (state, action) => {
      state.tempTrainingDetails = state.tempTrainingDetails.filter(
        (_, i) => i !== action.payload
      );
    },

    // ✅ Clear All Temporary Training
    clearAllTempTraining: (state) => {
      state.tempTrainingDetails = [];
    },

    // ✅ GET Request Reducers
    getTrainingRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getTrainingSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.status = action.payload.status;
      state.error = null;
    },
    getTrainingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ ADD Request Reducers (Dispatch tempTrainingDetails directly)
    addTrainingRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addTrainingSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
      state.tempTrainingDetails = []; // ✅ Clear temp details after successful save
    },
    addTrainingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ UPDATE Request Reducers
    updateTrainingRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTrainingSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    updateTrainingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ DELETE Request Reducers
    deleteTrainingRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteTrainingSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    deleteTrainingFailure: (state, action) => {
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
  saveTempTrainingDetails,
  editTempTraining,
  deleteTempTraining,
  clearAllTempTraining,
  getTrainingRequest,
  getTrainingSuccess,
  getTrainingFailure,
  addTrainingRequest,
  addTrainingSuccess,
  addTrainingFailure,
  updateTrainingRequest,
  updateTrainingSuccess,
  updateTrainingFailure,
  deleteTrainingRequest,
  deleteTrainingSuccess,
  deleteTrainingFailure,
  clearMessage
} = trainingSlice.actions;

// ✅ Export Reducer
export default trainingSlice.reducer;
