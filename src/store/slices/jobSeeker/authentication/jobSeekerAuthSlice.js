import { createSlice } from '@reduxjs/toolkit';

//  initial state
const initialState = {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    message: '',
    status: false
};

const jobSeekerAuthSlice = createSlice({
    name: 'jobSeekerAuth',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
            state.error = null; // ✅ Clear previous errors before login
            state.message = ''; // ✅ Clear message before new request
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.data;
            state.token = action.payload.token;
            state.message = action.payload.message || "Login successful!";
            state.error = null; // ✅ Clear error on success
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.data)); // ✅ Convert object to JSON
            state.status = action.payload.status;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload || "Invalid credentials!";
            state.message = ''; // ✅ Clear success message on failure
        },
        registerRequest: (state) => {
            state.loading = true;
            state.error = null; // ✅ Clear previous errors before registering
            state.message = ''; // ✅ Clear message before new request
        },
        registerSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.message = action.payload.message || "Registration successful!";
            state.token = action.payload.token;
            state.error = null; // ✅ Clear error on success
            state.status = action.payload.status;
        },
        registerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload || "Registration failed!";
            state.message = ''; // ✅ Clear success message on failure
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.loading = false;
            state.error = null;
            state.message = '';
            state.status = false;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
        clearAuthState: (state) => {
            state.error = null; // ✅ Clear errors when visiting login/signup
            state.message = ''; // ✅ Clear messages when visiting login/signup
        },
    },
});

export const { 
    loginRequest, loginSuccess, loginFailure, 
    registerRequest, registerSuccess, registerFailure, 
    logout, clearAuthState 
} = jobSeekerAuthSlice.actions;

export default jobSeekerAuthSlice.reducer;
