import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: false,
    message: "",
    loading: false,
    error: null,
    data: null, // Holds professional experience details
};

const professionalExperienceSlice = createSlice({
    name: "professionalExperience",
    initialState,
    reducers: {
        // ✅ GET Request Reducers
        getProfessionalExperienceRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        getProfessionalExperienceSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.error = null;
        },
        getProfessionalExperienceFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // ✅ ADD Request Reducers
        addProfessionalExperienceRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        addProfessionalExperienceSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        addProfessionalExperienceFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // ✅ UPDATE Request Reducers
        updateProfessionalExperienceRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateProfessionalExperienceSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        updateProfessionalExperienceFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // ✅ DELETE Request Reducers
        deleteProfessionalExperienceRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteProfessionalExperienceSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        deleteProfessionalExperienceFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

// Export Actions
export const {
    getProfessionalExperienceRequest, getProfessionalExperienceSuccess, getProfessionalExperienceFailure,
    addProfessionalExperienceRequest, addProfessionalExperienceSuccess, addProfessionalExperienceFailure,
    updateProfessionalExperienceRequest, updateProfessionalExperienceSuccess, updateProfessionalExperienceFailure,
    deleteProfessionalExperienceRequest, deleteProfessionalExperienceSuccess, deleteProfessionalExperienceFailure
} = professionalExperienceSlice.actions;

export default professionalExperienceSlice.reducer;
