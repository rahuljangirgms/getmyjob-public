// import { call, put, takeLatest } from "redux-saga/effects";
// import axios from "axios";
// import { authRequest, authSuccess, authFailure, loginRequest, loginSuccess, loginFailure } from "../slices/authSlice";


// // Use the JSON Server base URL
// const BASE_URL = "http://localhost:5000";
// // API Call Function for Signup
// const authApi = (userData) =>
//   axios.post(`https://recruitment.getmysolutions.in/api/v1/recruiter/register`, userData);

// // API Call Function for Login
// const loginApi = (credentials) =>
//   axios.post(`https://recruitment.getmysolutions.in/api/v1/recruiter/login`, credentials);

// // ----------------------------------
// // LOGIN SAGA
// // ----------------------------------
// function* loginSaga(action) {
//   try {
//     // action.payload -> { email, password, oauth_provider: "email_password" }
//     const response = yield call(loginApi, action.payload);

//     // New response structure:
//     // {
//     //   "status": true,
//     //   "message": "User Successfully Logged in",
//     //   "token": "abc123...",
//     //   "data": { ...user details },
//     //   "permissions": [ { id, menu, view, add, edit, delete }, ... ]
//     // }
//     const { token, message, data, permissions } = response.data;

//     // Merge permissions into the user object
//     const user = { ...data, permissions };

//     // Save token in localStorage
//     localStorage.setItem("token", token);

//     yield put(
//       loginSuccess({
//         token,
//         user,
//         message: message || "Login Successful",
//       })
//     );
//   } catch (error) {
//     yield put(
//       loginFailure(
//         error.response?.data?.message ||
//           "Login Failed! Please check your credentials."
//       )
//     );
//   }
// }

// // ----------------------------------
// // SIGNUP (AUTH) SAGA
// // ----------------------------------
// function* authSaga(action) {
//   try {
//     const { userData } = action.payload; // Destructure payload
//     const response = yield call(authApi, userData);
    
//     // Assume signup response structure is similar to login:
//     // {
//     //   "status": true,
//     //   "message": "Signup Successful",
//     //   "token": "abc123...",
//     //   "data": { ...user details },
//     //   "permissions": [ { id, menu, view, add, edit, delete }, ... ]
//     // }
//     const { token, message, data, permissions } = response.data;
//     const user = { ...data, permissions };

//     // Save token in localStorage
//     localStorage.setItem("token", token);

//     yield put(
//       authSuccess({
//         token,
//         user,
//         message: message || "Signup Successful",
//       })
//     );
//   } catch (error) {
//     yield put(
//       authFailure(
//         error.response?.data?.message || "Authentication Failed"
//       )
//     );
//   }
// }

// // 🔹 Watcher Saga for Authentication
// export function* watchAuth() {
//   yield takeLatest(authRequest.type, authSaga);
//   yield takeLatest(loginRequest.type, loginSaga);
// }


import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  authRequest,
  authSuccess,
  authFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
  changePasswordSuccess,
  changePasswordFailure,
  changePasswordRequest,
} from "../../slices/recruiter/authSlice";

// Use the JSON Server base URL
const BASE_URL = "https://recruitment.getmysolutions.in/api/v1";
// live url https://recruitment.getmysolutions.in/api/v1/
// API Call Function for Login using JSON Server
const loginApi = async (credentials) => {
  // const { email, password } = credentials;
  // 1) Get user by email
  // const res = await axios.get(`${BASE_URL}/users?email=${email}`);
  return await axios.post(`${BASE_URL}/recruiter/login`, credentials);
  // const users = res.data;
  // if (!users.length) {
  //   throw new Error("User not found");
  // }
  // const user = users[0];
  // // 2) Verify password (for demo purposes, passwords are stored in plain text)
  // if (user.password !== password) {
  //   throw new Error("Invalid password");
  // }
  // // 3) Return a fake token along with the user data and permissions
  // return {
  //   data: {
  //     token: "fake-jwt-token",
  //     message: "User Successfully Logged in",
  //     data: user,
  //     permissions: user.permissions || [],
  //   },
  // };
};

// API Call Function for Signup using JSON Server
const authApi = async (userData) => {
  // const { email } = userData;
  // 1) Check if user with this email already exists
  // const res = await axios.get(`${BASE_URL}/users?email=${email}`);
  return await axios.post(`${BASE_URL}/recruiter/register`, userData);
  // if (res.data.length) {
  //   throw new Error("User already exists");
  // }
  // 2) Create the new user; JSON Server will auto-generate an ID.
  //    (You may add default permissions here if needed.)
  // const newUser = {
  //   role: "recruiter", // default role
  //   ...userData,
  //   permissions: userData.permissions || [],
  // };
  // const createRes = await axios.post(`${BASE_URL}/users`, newUser);
  // return {
  //   data: {
  //     token: "fake-jwt-token",
  //     message: "Signup Successful",
  //     data: createRes.data,
  //     permissions: newUser.permissions,
  //   },
  // };
};

const Recruiterforgetpassword = async (payload) =>{
  return await axios.post(`${BASE_URL}/recruiter/forgot_password`, payload);
};
const RecruiterresetPasswordApi = async (payload) => {
  return await axios.post(`${BASE_URL}/recruiter/reset_password`, payload);
};
function RecruiterchangePasswordApi(token, payload) {
  return axios.post(`${BASE_URL}/recruiter/change_password`, payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
// LOGIN SAGA
function* loginSaga(action) {
  try {
    const response = yield call(loginApi, action.payload);
    const { token, message, data, permissions } = response.data;
    // Merge permissions into the user object
    const user = { ...data, permissions };
    // if (user.role === "recruiter") {
    //   // Define a default full permissions array for recruiters.
    //   // (Customize this array as per your requirements)
    //   user.permissions = [
    //     { id: 1, menu: "dashboard", view: 1, add: 1, edit: 1, delete: 1 },
    //     { id: 2, menu: "company profile", view: 1, add: 1, edit: 1, delete: 1 },
    //     // You can add more permissions if needed.
    //   ];
    // }
    // Save token in localStorage

    // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("auth", JSON.stringify({ token, user }));
    yield put(
      loginSuccess({
        token,
        user,
        message: message || "Login Successful",
      })
    );
  } catch (error) {
    yield put(
      loginFailure(error.message || "Login Failed! Please check your credentials.")
    );
  }
}

// SIGNUP SAGA
function* authSaga(action) {
  try {
    const { userData } = action.payload;
    const response = yield call(authApi, userData);
    const { token, message, data, permissions } = response.data;
    const user = { ...data, permissions };
    localStorage.setItem("auth", JSON.stringify({ token, user }));
    yield put(
      authSuccess({
        token,
        user,
        message: message || "Signup Successful",
      })
    );
  } catch (error) {
    yield put(authFailure(error.message || "Authentication Failed"));
  }
}

// --- FORGOT PASSWORD SAGA ---
function* RecruiterforgotPasswordSaga(action) {
  try {
    const response = yield call(Recruiterforgetpassword, action.payload);
    const message = response.data.message || "Reset link sent successfully";
    yield put(forgotPasswordSuccess(message));
  } catch (error) {
    yield put(forgotPasswordFailure(error.response?.data?.error || error.message));
  }
}

// --- RESET PASSWORD SAGA ---
function* RecruiterresetPasswordSaga(action) {
  try {
    const response = yield call(RecruiterresetPasswordApi, action.payload);
    const message = response.data.message || "Password reset successfully";
    yield put(resetPasswordSuccess(message));
  } catch (error) {
    yield put(resetPasswordFailure(error.response?.data?.error || error.message));
  }
}

function* RecruiterchangePasswordSaga(action) {
  try {
    // Grab the token from Redux
    const token = yield select((state) => state.auth.token);

    // Call the API with token in headers
    const response = yield call(RecruiterchangePasswordApi, token, action.payload);

    const message = response.data.message || "Password changed successfully";
    yield put(changePasswordSuccess(message));
  } catch (error) {
    yield put(
      changePasswordFailure(
        error.response?.data?.message || error.message || "Password change failed"
      )
    );
  }
}

// Watcher Saga for Authentication
export function* watchAuth() {
  yield takeLatest(authRequest.type, authSaga);
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(forgotPasswordRequest.type, RecruiterforgotPasswordSaga);
  yield takeLatest(resetPasswordRequest.type, RecruiterresetPasswordSaga);
  yield takeLatest(changePasswordRequest.type,RecruiterchangePasswordSaga)
}
