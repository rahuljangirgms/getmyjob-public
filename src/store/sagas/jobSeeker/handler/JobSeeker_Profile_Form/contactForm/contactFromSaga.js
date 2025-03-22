import { call, put, takeLatest, select } from "redux-saga/effects";
import {saveContactInfoApi, getContactInfoApi} from './../../../request/JobSeeker_Profile_Form/contactFormRequest/contactFormRequest'

import {
  postContactInfoRequest,
  postContactInfoFailure,
  postContactInfoSuccess,
  getContactInfoFailure,
  getContactInfoRequest,
  getContactInfoSuccess,
} from "./../../../../../slices/jobSeeker/Profile_Form/contactInfoSlice";

// Selector to get the token from Redux store
const getAuthToken = (state) => state.jobSeekerAuth.token;

// Saga for POST request (Save Contact Information)
function* handlePostContactInfo(action) {
  try {
    // Retrieve token from Redux store
    const token = yield select(getAuthToken);
    console.log("Token for API call:", token);
    
    // Make API call with Authorization header
    const response = yield call(saveContactInfoApi, action.payload, token);
    const { data, status } = response.data;
    console.log("POST Response:", data);
    
    // Dispatch success action for POST
    yield put(postContactInfoSuccess( data, status));
    
    // Immediately trigger GET request to fetch updated contact info
    yield put(getContactInfoRequest());
  } catch (error) {
    console.error("POST Error:", error);
    yield put(postContactInfoFailure(error.response?.data || "Something went wrong!"));
  }
}

// Saga for GET request (Fetch Contact Information)
function* handleGetContactInfo() {
  try {
    // Retrieve token from Redux store
    const token = yield select(getAuthToken);
    console.log("Token for API call:", token);
    
    // Make API call with Authorization header
    const response = yield call(getContactInfoApi, token);
    console.log("GET Response:", response);
    
    // Dispatch success action with response data
    yield put(getContactInfoSuccess(response));
  } catch (error) {
    console.error("GET Error:", error);
    yield put(getContactInfoFailure(error.response?.data || "Failed to fetch contact info!"));
  }
}

// Watcher Sagas
export function* watchContactInfo() {
  yield takeLatest(postContactInfoRequest.type, handlePostContactInfo);
  yield takeLatest(getContactInfoRequest.type, handleGetContactInfo);
}
