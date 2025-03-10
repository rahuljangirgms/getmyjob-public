import { takeLatest, call, put } from 'redux-saga/effects';
    


import {loginRequest, loginSuccess, loginFailure, registerRequest, registerSuccess, registerFailure} from './../../../slices/jobSeeker/authentication/jobSeekerAuthSlice'
import { loginApi, registerApi } from './../request/authRequests';

function* handleLogin(action) {
    try {
        const response = yield call(loginApi, action.payload);
        //console.log("Login Response:", response);
        yield put(loginSuccess(response.data));
    } catch (error) {
        yield put(loginFailure(error.response?.data?.message || "Invalid credentials!"));
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

export function* watchJobSeekerAuth() {
    yield takeLatest(loginRequest.type, handleLogin);
    yield takeLatest(registerRequest.type, handleRegister);
}
