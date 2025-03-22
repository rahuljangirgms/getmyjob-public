import { createSlice } from "@reduxjs/toolkit";

// ✅ Initial State (No Local Storage)
const initialState = {
  status: false,
  message: "",
  loading: false,
  error: null,
  data: [], // Holds Research Papers details from API
  tempResearchPaperDetails: [], // ✅ Temporary storage (only in Redux state)
};

const researchPaperSlice = createSlice({
  name: "researchPaper",
  initialState,
  reducers: {
    // ✅ Add Temporary Research Paper
    saveTempResearchPaperDetails: (state, action) => {
      state.tempResearchPaperDetails.push(action.payload);
    },

    // ✅ Edit Temporary Research Paper
    editTempResearchPaper: (state, action) => {
      const { index, updatedData } = action.payload;
      if (state.tempResearchPaperDetails[index]) {
        state.tempResearchPaperDetails[index] = updatedData; // ✅ Update existing entry
      }
    },

    // ✅ Delete Temporary Research Paper
    deleteTempResearchPaper: (state, action) => {
      state.tempResearchPaperDetails = state.tempResearchPaperDetails.filter(
        (_, i) => i !== action.payload
      );
    },

    // ✅ Clear All Temporary Research Papers
    clearAllTempResearchPapers: (state) => {
      state.tempResearchPaperDetails = [];
    },

    // ✅ GET Request Reducers
    getResearchPaperRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getResearchPaperSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.status = action.payload.status;
      state.error = null;
    },
    getResearchPaperFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ ADD Request Reducers (Dispatch tempResearchPaperDetails directly)
    addResearchPaperRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addResearchPaperSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
      state.tempResearchPaperDetails = []; // ✅ Clear temp details after successful save
    },
    addResearchPaperFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ UPDATE Request Reducers
    updateResearchPaperRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateResearchPaperSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    updateResearchPaperFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ DELETE Request Reducers
    deleteResearchPaperRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteResearchPaperSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    deleteResearchPaperFailure: (state, action) => {
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
  saveTempResearchPaperDetails,
  editTempResearchPaper,
  deleteTempResearchPaper,
  clearAllTempResearchPapers,
  getResearchPaperRequest,
  getResearchPaperSuccess,
  getResearchPaperFailure,
  addResearchPaperRequest,
  addResearchPaperSuccess,
  addResearchPaperFailure,
  updateResearchPaperRequest,
  updateResearchPaperSuccess,
  updateResearchPaperFailure,
  deleteResearchPaperRequest,
  deleteResearchPaperSuccess,
  deleteResearchPaperFailure,
  clearMessage
} = researchPaperSlice.actions;

// ✅ Export Reducer
export default researchPaperSlice.reducer;
