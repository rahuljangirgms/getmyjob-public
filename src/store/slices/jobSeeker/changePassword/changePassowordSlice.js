import { createSlice } from "@reduxjs/toolkit";

const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState: {
    loading: false,
    message: null,
    status: false,
    error: null,
  },
  reducers: {
    changePasswordRequest: (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
      state.status = false;
    },
    changePasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.status = true;
    },
    changePasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.status = false;
    },
    clearChangePasswordMessages: (state) => {
      state.message = null;
      state.error = null;
      state.status = false;
    },
  },
});

export const {
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,
  clearChangePasswordMessages,
} = changePasswordSlice.actions;

export default changePasswordSlice.reducer;
