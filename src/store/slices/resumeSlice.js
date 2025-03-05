import { createSlice } from "@reduxjs/toolkit";

// Function to load resumes from localStorage
const loadResumesFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("resumes");
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (error) {
    console.error("Failed to load resumes from localStorage", error);
    return [];
  }
};

// Function to save resumes array to localStorage
const saveResumesToLocalStorage = (resumes) => {
  try {
    localStorage.setItem("resumes", JSON.stringify(resumes));
  } catch (error) {
    console.error("Failed to save resumes to localStorage", error);
  }
};

const initialState = {
  resumes: loadResumesFromLocalStorage() // Load existing resumes if any
};

const resumeSlice = createSlice({
  name: "resumes",
  initialState,
  reducers: {
    addResume: (state, action) => {
      // action.payload should be an object like:
      // { name: "Resume Name", data: { ...resumeData } }
      state.resumes.push(action.payload);
      saveResumesToLocalStorage(state.resumes);
    },
    // Optional: Remove a resume by index
    removeResume: (state, action) => {
      state.resumes = state.resumes.filter((_, index) => index !== action.payload);
      saveResumesToLocalStorage(state.resumes);
    },
    // Optional: Clear all resumes from the state and localStorage
    clearResumes: (state) => {
      state.resumes = [];
      localStorage.removeItem("resumes");
    }
  }
});

export const { addResume, removeResume, clearResumes } = resumeSlice.actions;
export default resumeSlice.reducer;
