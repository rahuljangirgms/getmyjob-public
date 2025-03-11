import { createSlice } from '@reduxjs/toolkit';

//  initial state
const initialState = {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    message: '',
    status: false,
    email:''
};

const jobSeekerAuthSlice = createSlice({
    name: 'jobSeekerAuth',
    initialState,
    reducers: {

        // Login User Actions Here

        loginRequest: (state) => {
            state.loading = true;
            state.error = null; // ✅ Clear previous errors before login
            state.message = ''; // ✅ Clear message before new request
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.data; // ✅ Correctly store user data
            state.token = action.payload.token; // ✅ Store token
            state.message = action.payload.message || "Login successful!"; // ✅ Ensure message is always set
            state.error = null; // ✅ Clear previous errors
            state.status = action.payload.status ?? true; // ✅ Prevent `undefined` status
        },
        
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload || "Invalid credentials!";
            state.message = ''; // ✅ Clear success message on failure
        },

        // Register New User Actions Here


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

        // ForgetPassword Actions Here

        forgetPassRequest:(state,action) =>{
            state.loading = true;
            state.error = null;
            state.message = '';
        },  
        forgetPassSuccess:(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.error = null;
            state.email = action.payload.email;
        },
        forgetPassFailure:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
            state.message = '';
            state.status = action.payload.status;
        },


        // Reset Password Actions Here 

        resetPassRequest:(state,action)=>{
            state.loading = true;
            state.error = null;
            state.message = '';
        },
        resetPassSuccess:(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.error = null;
        },
        resetPassFailure:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },

        // Logout User Action Here

        logout: (state) => {
            state.user = null;
            state.token = null;
            state.loading = false;
            state.error = null;
            state.message = '';
            state.status = false;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("auth");
            localStorage.removeItem("email");
        },


        // Clearing auth state here for preventing twice msg disply in toast 

        clearAuthState: (state) => {
            state.error = null; // ✅ Clear errors when visiting login/signup
            state.message = ''; // ✅ Clear messages when visiting login/signup
        },
    },
});

export const { 
    loginRequest, loginSuccess, loginFailure, 
    registerRequest, registerSuccess, registerFailure,
    forgetPassRequest,forgetPassSuccess, forgetPassFailure,
    resetPassRequest,resetPassSuccess,resetPassFailure,
    logout, clearAuthState 
} = jobSeekerAuthSlice.actions;

export default jobSeekerAuthSlice.reducer;
