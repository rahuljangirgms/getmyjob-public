import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  status: false,
  message: '',
  error: null,
  openToWork: null, // ✅ For storing open_to_work value (true/false or 1/0)
};

const openToWorkSlice = createSlice({
  name: 'openToWork',
  initialState,
  reducers: {
    // --- SET Open to Work ---
    setOpenToWorkRequest: (state) => {
      state.loading = true;
    },
    setOpenToWorkSuccsess: (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.loading = false;
      state.error = null;
    },
    setOpenToWorkFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Something went wrong';
    },

    // --- GET Open to Work ---
    getOpenToWorkRequest: (state) => {
      state.loading = true;
    },
    getOpenToWorkSuccess: (state, action) => {
      state.loading = false;
      state.openToWork = action.payload; // expected value: 1 or 0
      state.error = null;
    },
    getOpenToWorkFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to fetch status';
    },

    // --- Clear message/status ---
    clearMessages: (state) => {
      state.message = '';
      state.status = false;
    },
  },
});

export const {
  setOpenToWorkRequest,
  setOpenToWorkSuccsess,
  setOpenToWorkFailure,
  getOpenToWorkRequest,
  getOpenToWorkSuccess,
  getOpenToWorkFailure,
  clearMessages,
} = openToWorkSlice.actions;

export default openToWorkSlice.reducer;
