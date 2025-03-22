// src/store/slices/recruiter/companySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  company: null, // initialize as null
  loading: false,
  error: null,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    // Fetch
    fetchCompanyRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCompanySuccess: (state, action) => {
      state.loading = false;
      const payload = action.payload || {};
      state.company = {
        id: payload.id || null,
        bash_id: payload.bash_id || "",
        name: payload.name || "",
        website: payload.website || "",
        industry: Array.isArray(payload.industry) ? payload.industry : [],
        company_size: payload.company_size || "",
        company_description: payload.company_description || "",
        locations: Array.isArray(payload.locations) ? payload.locations : [],
        company_logo: payload.company_logo || "",
        social_profiles: Array.isArray(payload.social_profiles)
        ? payload.social_profiles
        : [],

      };
    },
    fetchCompanyFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update
    updateCompanyRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateCompanySuccess: (state, action) => {
      state.loading = false;
      const payload = action.payload || {};
      state.company = {
        ...state.company,
        ...payload,
        // ensure these fields are arrays if needed
        industry: Array.isArray(payload.industry) ? payload.industry : [],
        locations: Array.isArray(payload.locations) ? payload.locations : [],
        social_profiles: Array.isArray(payload.social_profiles)
        ? payload.social_profiles
        : state.company.social_profiles,
      };
    },
    updateCompanyFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCompanyRequest,
  fetchCompanySuccess,
  fetchCompanyFailure,
  updateCompanyRequest,
  updateCompanySuccess,
  updateCompanyFailure,
} = companySlice.actions;

export default companySlice.reducer;
