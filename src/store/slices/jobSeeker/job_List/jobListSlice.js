import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobList: [],
  interViewRounds:[],
  jobDetails:null,
  loading: false,
  error: null,
};

const jobListSlice = createSlice({
  name: 'jobList',
  initialState,
  reducers: {
    getJobListRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    getJobListSuccess: (state, action) => {
      state.jobList = action.payload?.data;
      state.loading = false;
    },
    getJobListFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getJobDetailsRequest: (state,action) =>{
      state.loading = true;
      state.error = null;
    },
    getJobDetailsSuccess: (state,action) =>{
      state.jobDetails = action.payload?.data;
      state.loading = false;
    },
    getJobDetailsFailure: (state,action) =>{
      state.error = action.payload;
      state.loading = false;
    },
    getJobRoundsRequest: (state,action) =>{
      state.loading = true;
      state.error = null;
    },
    getJobRoundsSuccsess: (state,action) =>{
      state.interViewRounds = action.payload?.data;
      state.loading = false;
    },
    getJobRoundFailure: (state,action) =>{
      state.error = action.payload;
      state.loading = false;
    }

  },
});

export const {
  getJobListRequest,
  getJobListSuccess,
  getJobListFailure,
  getJobDetailsRequest,
  getJobDetailsSuccess,
  getJobDetailsFailure,
  getJobRoundFailure,
  getJobRoundsRequest,
  getJobRoundsSuccsess
} = jobListSlice.actions;

export default jobListSlice.reducer;
