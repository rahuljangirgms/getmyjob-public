import { createSlice } from "@reduxjs/toolkit";

// ✅ Initial State (No Local Storage)
const initialState = {
  status: false,
  message: "",
  loading: false,
  error: null,
  data: [], // Holds Certifications details from API
  tempCertificationDetails: [], // ✅ Temporary storage (only in Redux state)
};

const certificationSlice = createSlice({
  name: "certificationDetails",
  initialState,
  reducers: {
    // ✅ Add Temporary Certification
    saveTempCertificationDetails: (state, action) => {
      state.tempCertificationDetails.push(action.payload);
    },

    // ✅ Edit Temporary Certification
    editTempCertification: (state, action) => {
      const { index, updatedData } = action.payload;
      if (state.tempCertificationDetails[index]) {
        state.tempCertificationDetails[index] = updatedData; // ✅ Update existing entry
      }
    },

    // ✅ Delete Temporary Certification
    deleteTempCertification: (state, action) => {
      state.tempCertificationDetails = state.tempCertificationDetails.filter(
        (_, i) => i !== action.payload
      );
    },

    // ✅ Clear All Temporary Certification
    clearAllTempCertification: (state) => {
      state.tempCertificationDetails = [];
    },

    // ✅ GET Request Reducers
    getCertificationRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCertificationSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.status = action.payload.status;
      state.error = null;
    },
    getCertificationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ ADD Request Reducers (Dispatch tempCertificationDetails directly)
    addCertificationRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addCertificationSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
      state.tempCertificationDetails = []; // ✅ Clear temp details after successful save
    },
    addCertificationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ UPDATE Request Reducers
    updateCertificationRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateCertificationSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    updateCertificationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ DELETE Request Reducers
    deleteCertificationRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteCertificationSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    deleteCertificationFailure: (state, action) => {
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
  saveTempCertificationDetails,
  editTempCertification,
  deleteTempCertification,
  clearAllTempCertification,
  getCertificationRequest,
  getCertificationSuccess,
  getCertificationFailure,
  addCertificationRequest,
  addCertificationSuccess,
  addCertificationFailure,
  updateCertificationRequest,
  updateCertificationSuccess,
  updateCertificationFailure,
  deleteCertificationRequest,
  deleteCertificationSuccess,
  deleteCertificationFailure,
  clearMessage
} = certificationSlice.actions;

// ✅ Export Reducer
export default certificationSlice.reducer;
