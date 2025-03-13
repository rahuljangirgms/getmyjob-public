import { call, put, takeLatest, select } from "redux-saga/effects";
import { saveEducationInfoApi, getEducationInfoApi } from './../../../request/JobSeeker_Profile_Form/educationFormRequest/educationFormRequest';

import {
    postEducationInfoFailure,
    postEducationInfoRequest,
    postEducationInfoSuccess,
    getEducationInfoFailure,
    getEducationInfoRequest,
    getEducationInfoSuccess
} from "./../../../../../slices/jobSeeker/Profile_Form/educationInfoSlice";

// Selector to get the token from Redux store
const getAuthToken = (state) => state.jobSeekerAuth.token;

console.log("TOCKEN FOR Post educ",getAuthToken);

// Saga for POST request (Save Contact Information)
function* handlePostEducationInfo(action) {
  try {
    // Retrieve token from Redux store
    const token = yield select(getAuthToken);
    console.log("Token for API call:", token);
    
    // Destructure type and data from the action payload
    const { type, data } = action.payload;
    
    // Make API call with Authorization header using the new signature
    const response = yield call(saveEducationInfoApi, data, type, token);
    
    const { message, status } = response.data;
    console.log("POST Response:", message);
    
    // Dispatch success action for POST
    yield put(postEducationInfoSuccess(message, status));
    
    // Immediately trigger GET request to fetch updated education info
    yield put(getEducationInfoRequest());
  } catch (error) {
    console.error("POST Error:", error);
    yield put(postEducationInfoFailure(error.response?.data || "Something went wrong!"));
  }
}


// Saga for GET request (Fetch Education Information)
function* handleGetEducationInfo() {
  try {
    // Retrieve token from Redux store
    const token = yield select(getAuthToken);
    console.log("Token for API call:", token);
    
    // Make API call with Authorization header
    const response = yield call(getEducationInfoApi, token);
    // Destructure from response.data if using axios
    const { message, status, data } = response.data;
    console.log("GET Response:", response);
    
    // Dispatch success action with response data
    yield put(getEducationInfoSuccess(message, status, data));
  } catch (error) {
    console.error("GET Error:", error);
    yield put(getEducationInfoFailure(error.response?.data || "Failed to fetch education info!"));
  }
}


// Watcher Sagas
export function* watchEducationInfo() {
  yield takeLatest(postEducationInfoRequest.type, handlePostEducationInfo);
  yield takeLatest(getEducationInfoRequest.type, handleGetEducationInfo);
}
