import { takeLatest, call, put } from 'redux-saga/effects';
    


import {loginRequest, loginSuccess, loginFailure, registerRequest, registerSuccess, registerFailure, forgetPassRequest, forgetPassSuccess, forgetPassFailure, resetPassSuccess, resetPassFailure, resetPassRequest} from './../../../slices/jobSeeker/authentication/jobSeekerAuthSlice'
import { forgetPassApi, loginApi, registerApi, resetPassApi } from './../request/authRequests';




function* handleLogin(action) {
    try {
        const response = yield call(loginApi, action.payload);
        const { data, token, status, message } = response.data; // ✅ Ensure all fields are extracted

        console.log("Login Response:", response.data);
        
        yield put(loginSuccess({ data, token, status, message })); // ✅ Include `status` and `message`

        // ✅ Store in localStorage
        localStorage.setItem("auth", JSON.stringify({ token, user: data }));
        
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Invalid credentials!"; // ✅ Prevent crash
        yield put(loginFailure(errorMessage));
    }
}


function* handleRegister(action) {
    try {
        const response = yield call(registerApi, action.payload);
       // console.log("Sign Up Response:", response);
        yield put(registerSuccess(response.data));
    } catch (error) {
        yield put(registerFailure(error.response?.data || 'Registration failed'));
    }
}


function* handleForgetPassword(action) {
    try {
        const response = yield call(forgetPassApi, action.payload);
        const { status, message, data, email } = response.data; 

        if (status) {
            yield put(forgetPassSuccess({message, data,status, email} )); 
            localStorage.setItem("email",email);
        } else {
            yield put(forgetPassFailure(message)); 
        }

    } catch (error) {
        const errorMessage = error.response?.data?.message || "Forget Password Request Failed"; 
        const status = error.response?.status || false;
        yield put(forgetPassFailure({errorMessage,status})); 
    }
}

function* handleResetPassword(action) {
    try {
        const response = yield call(resetPassApi, { password: action.payload.password, email: action.payload.email });

        const { status, message } = response.data;
        if (status) {
            yield put(resetPassSuccess({ status, message }));
        } else {
            yield put(resetPassFailure({ message, status: false }));
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Reset Password Request Failed';
        yield put(resetPassFailure({ message: errorMessage, status: false }));
    }
}

export function* watchJobSeekerAuth() {
    yield takeLatest(loginRequest.type, handleLogin);
    yield takeLatest(registerRequest.type, handleRegister);
    yield takeLatest(forgetPassRequest.type, handleForgetPassword);
    yield takeLatest(resetPassRequest.type, handleResetPassword);
}
