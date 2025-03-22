import { createSlice } from "@reduxjs/toolkit";

// ✅ Initial State
const initialState = {
  status: false,
  message: "",
  loading: false,
  error: null,
  data: [], // Holds Other Details from API
  tempOtherDetails: [], // ✅ Temporary storage (only in Redux state)
};

const otherDetailsSlice = createSlice({
  name: "otherDetails",
  initialState,
  reducers: {


    // ✅ GET Request Reducers
    getOtherDetailsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getOtherDetailsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload?.data;
      state.status = action.payload?.status;
      state.error = null;
    },
    getOtherDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ ADD Request Reducers
    addOtherDetailsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addOtherDetailsSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload?.message;
      state.status = action.payload?.status;
      state.tempOtherDetails = []; // ✅ Clear temp details after successful save
    },
    addOtherDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearMessage: (state) => {
      state.message = "";
      state.status = false;
    },
  },
});

// ✅ Export Actions
export const {
  getOtherDetailsRequest,
  getOtherDetailsSuccess,
  getOtherDetailsFailure,
  addOtherDetailsRequest,
  addOtherDetailsSuccess,
  addOtherDetailsFailure,
  clearMessage,
} = otherDetailsSlice.actions;

// ✅ Export Reducer
export default otherDetailsSlice.reducer;
