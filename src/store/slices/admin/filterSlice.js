import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  experience: "",
  jobTitle: "",
  status: "", // ✅ Add status filter
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setLocationFilter: (state, action) => {
      state.location = action.payload;
    },
    setExperienceFilter: (state, action) => {
      state.experience = action.payload;
    },
    setJobTitleFilter: (state, action) => {
      state.jobTitle = action.payload;
    },
    setStatusFilter: (state, action) => {  // ✅ New status filter
      state.status = action.payload;
    },
  },
});

export const { setLocationFilter, setExperienceFilter, setJobTitleFilter, setStatusFilter } = filterSlice.actions;
export default filterSlice.reducer;
