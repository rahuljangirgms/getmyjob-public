import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
  status: false,
  message: "",
};

const documentSlice = createSlice({
  name: "JobSeekerDocuments",
  initialState,
  reducers: {
    //POST Documents Requests

    postDocumentsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    postDocumentsSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload?.message;
      state.error = null;
    },
    postDocumentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // GET Documents Requests

    getDocumentsRequest: (state) =>{
        state.loading = true;
        state.error = null;
    },
    getDocumentsSuccess: (state,action) =>{
        state.loading = false;
        state.data = action.payload?.data || null; // ✅ Ensure valid data assignment
        state.status = action.payload?.status || false;
        state.message = action.payload?.message || "";
        state.error = null;
    },
    getDocumentsFailure: (state,action) =>{
        state.loading = false;
        state.error = action.payload;
    },

  },
});


export const {
    postDocumentsRequest,
    postDocumentsSuccess,
    postDocumentsFailure,

    getDocumentsRequest,
    getDocumentsSuccess,
    getDocumentsFailure
} = documentSlice.actions;


export default documentSlice.reducer;
