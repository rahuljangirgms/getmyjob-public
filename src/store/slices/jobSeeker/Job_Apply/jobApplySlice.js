import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  success: false,
  message: '',
  error: null,
};

const jobApplySlice = createSlice({
  name: 'jobApply',
  initialState,
  reducers: {
    applyJobRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    applyJobSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.message = action.payload.message || 'Applied successfully!';
    },
    applyJobFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload || 'Something went wrong';
    },
    clearJobApplyStatus: (state) => {
      state.success = false;
      state.message = '';
      state.error = null;
    },
  },
});

export const {
  applyJobRequest,
  applyJobSuccess,
  applyJobFailure,
  clearJobApplyStatus,
} = jobApplySlice.actions;

export default jobApplySlice.reducer;
