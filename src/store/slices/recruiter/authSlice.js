// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null,
//   token: localStorage.getItem("token") || null,
//   loading: false,
//   message: null, // Store success message
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     loginRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//       state.message = null;
//     },
//     loginSuccess: (state, action) => {
//       state.loading = false;
//       state.user = action.payload.user; // Now includes permissions
//       state.token = action.payload.token;
//       state.message = action.payload.message;
//       localStorage.setItem("token", action.payload.token);
//     },
//     loginFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//       state.message = null;
//     },
//     authRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//       state.message = null;
//     },
//     authSuccess: (state, action) => {
//       state.loading = false;
//       state.user = action.payload.user; // Now includes permissions along with user data
//       state.token = action.payload.token;
//       state.message = action.payload.message;
//       localStorage.setItem("token", action.payload.token);
//     },
//     authFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//       state.message = null;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.loading = false;
//       state.error = null;
//       state.message = null;
//       localStorage.removeItem("token");
//     },
//   },
// });

// // Export Actions
// export const {
//   authRequest,
//   authSuccess,
//   authFailure,
//   logout,
//   loginRequest,
//   loginSuccess,
//   loginFailure,
// } = authSlice.actions;
// export default authSlice.reducer;


// src/store/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initialize state from localStorage
const storedAuth = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : { token: null, user: null };

const initialState = {
  user: storedAuth.user,
  token: storedAuth.token,
  resetEmail: "", 
  loading: false,
  message: null, // Store success message
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user; // Now includes permissions
      state.token = action.payload.token;
      state.message = action.payload.message;
      // Update localStorage with new auth data
      localStorage.setItem("auth", JSON.stringify({ token: action.payload.token, user: action.payload.user }));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    authRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    authSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user; // Now includes permissions along with user data
      state.token = action.payload.token;
      state.message = action.payload.message;
      // Update localStorage with new auth data
      localStorage.setItem("auth", JSON.stringify({ token: action.payload.token, user: action.payload.user }));
    },
    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.message = null;
      localStorage.removeItem("auth");
    },
      // --- New reducers for forgot password ---
      forgotPasswordRequest: (state,action) => {
        state.loading = true;
        state.error = null;
        state.message = null;
        state.resetEmail = action.payload.email;
      },
      forgotPasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      forgotPasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      // --- New reducers for reset password ---
      resetPasswordRequest: (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      },
      resetPasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      resetPasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
  },
});

export const {
  authRequest,
  authSuccess,
  authFailure,
  logout,
  loginRequest,
  loginSuccess,
  loginFailure,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
} = authSlice.actions;
export default authSlice.reducer;
