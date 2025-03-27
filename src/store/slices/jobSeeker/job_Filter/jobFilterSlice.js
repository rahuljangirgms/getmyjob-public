import { createSlice } from "@reduxjs/toolkit";

const jobFilterSlice = createSlice({
  name: "jobFilter",
  initialState: {
    loading: false,
    jobs: [],
    error: null,
  },
  reducers: {
    filterJobsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    filterJobsSuccess: (state, action) => {
      state.loading = false;
      state.jobs = action.payload?.data;
    },
    filterJobsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  filterJobsRequest,
  filterJobsSuccess,
  filterJobsFailure,
} = jobFilterSlice.actions;

export default jobFilterSlice.reducer;
