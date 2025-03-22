import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs:[], 
  
  // {
    // activeJobs: [],
    // draftJobs: [],
    // expiredJobs: [],
  // },
    filters: {
      title: "",
      status: "",
      hotJob: "",
      date: "",

  },
  interviewRoundsOptions: [],
  loading: false,
  error: null,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    // New actions for fetching interview rounds
    fetchInterviewRoundsRequest: (state) => {
      state.loading = true;
    },
    fetchInterviewRoundsSuccess: (state, action) => {
      state.loading = false;
      state.interviewRoundsOptions = action.payload;
    },
    fetchInterviewRoundsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchJobsRequest: (state) => {
      console.log("🟡 Fetching jobs...");
      state.loading = true;
    },
    fetchJobsSuccess: (state, action) => {
      console.log("🔥 Reducer: Updating jobs state", action.payload);
      state.loading = false;
      state.jobs = action.payload ;
    },
    setJobFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    }, 
    fetchJobsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createJobRequest: (state, action) => {
      console.log("🚀 Creating job...", action.payload);
      state.loading = true;
    },
    createJobSuccess: (state, action) => {
      state.loading = false;
      // state.jobs.push(action.payload);
      const newJob = action.payload;
      if (newJob.status === "Active") {
        state.jobs.activeJobs.push(newJob);
      } else if (newJob.status === "Draft") {
        state.jobs.draftJobs.push(newJob);
      } else if (newJob.status === "Expired") {
        state.jobs.expiredJobs.push(newJob);
      }
    },
    createJobFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // deleteJobRequest: (state, action) => {
    //   const jobId = action.payload;
    //   state.jobs.activeJobs = state.jobs.activeJobs.filter((job) => job.id !== jobId);
    //   state.jobs.draftJobs = state.jobs.draftJobs.filter((job) => job.id !== jobId);
    //   state.jobs.expiredJobs = state.jobs.expiredJobs.filter((job) => job.id !== jobId);
    // },
    updateJobRequest: (state, action) => {
      console.log("🚀 Updating job...", action.payload);
      state.loading = true;
    },
    updateJobSuccess: (state, action) => {
      state.loading = false;
      const updatedJob = action.payload;
      state.jobs.activeJobs = state.jobs.activeJobs.filter((job) => job.id !== updatedJob.id);
      state.jobs.draftJobs = state.jobs.draftJobs.filter((job) => job.id !== updatedJob.id);
      state.jobs.expiredJobs = state.jobs.expiredJobs.filter((job) => job.id !== updatedJob.id);
      if (updatedJob.status === "Active") {
        state.jobs.activeJobs.push(updatedJob);
      } else if (updatedJob.status === "Draft") {
        state.jobs.draftJobs.push(updatedJob);
      } else if (updatedJob.status === "Expired") {
        state.jobs.expiredJobs.push(updatedJob);
      }
    },
    updateJobFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteJobRequest: (state, action) => {
      console.log("🚀 Deleting job...", action.payload);
      // We just set loading=true here; actual removal in deleteJobSuccess
      state.loading = true;
    },
    deleteJobSuccess: (state, action) => {
      state.loading = false;
      // action.payload should be { id, bash_id }
      const { id } = action.payload;
      // Remove from active, draft, and expired arrays
      state.jobs.activeJobs = state.jobs.activeJobs.filter((job) => job.id !== id);
      state.jobs.draftJobs = state.jobs.draftJobs.filter((job) => job.id !== id);
      state.jobs.expiredJobs = state.jobs.expiredJobs.filter((job) => job.id !== id);
    },
    deleteJobFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchJobsRequest,
  fetchJobsSuccess,
  fetchJobsFailure,
  setJobFilters,
  createJobRequest,
  createJobSuccess,
  createJobFailure,
  // deleteJobRequest,
  updateJobRequest,
  updateJobSuccess,
  updateJobFailure,
  fetchInterviewRoundsRequest,
  fetchInterviewRoundsSuccess,
  fetchInterviewRoundsFailure,
  deleteJobRequest,
  deleteJobSuccess,
  deleteJobFailure,
} = jobSlice.actions;

export default jobSlice.reducer;
