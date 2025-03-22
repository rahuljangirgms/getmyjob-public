import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
  status: false,
  message: "",
};

const contactInfoSlice = createSlice({
  name: "jobSeekerContactInfo",
  initialState,
  reducers: {
    // ✅ POST ContactInfo Reducers
    postContactInfoRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    postContactInfoSuccess: (state, action) => {
      console.log("POST Success Data:", action.payload); // Debugging
      state.loading = false;
      state.data = action.payload; // Ensure correct assignment
      state.error = null;
    },
    postContactInfoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ GET ContactInfo Reducers
    getContactInfoRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getContactInfoSuccess: (state, action) => {
      console.log("GET Success Data:", action.payload); // Debugging
      state.loading = false;
      state.data = action.payload?.data || null; // ✅ Ensure valid data assignment
      state.status = action.payload?.status || false;
      state.message = action.payload?.message || "";
      state.error = null;
    },
    getContactInfoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  postContactInfoRequest,
  postContactInfoFailure,
  postContactInfoSuccess,

  getContactInfoFailure,
  getContactInfoRequest,
  getContactInfoSuccess,
} = contactInfoSlice.actions;

export default contactInfoSlice.reducer;
