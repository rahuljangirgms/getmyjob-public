import { call, put, takeLatest, select } from "redux-saga/effects";
import { checkProfileCompleteApi } from "./../../request/check_Profile_completed_Request/isProfileCompleteRequest";

import {
  checkProfileCompleteRequest,
  checkProfileCompleteSuccess,
  checkProfileCompleteFailure,
} from "./../../../../slices/jobSeeker/isProfileCompleted/isProfileCompleteSlice";

// ✅ Selector to get auth token
const getAuthToken = (state) => state.jobSeekerAuth.token;

// ✅ Handle GET request to check profile completion
function* handleCheckProfileComplete() {
  try {
    const token = yield select(getAuthToken);
    const response = yield call(checkProfileCompleteApi, token);

    console.log("Check Profile Completion Response:", response); // Debugging

    yield put(checkProfileCompleteSuccess(response));
  } catch (error) {
    yield put(checkProfileCompleteFailure(error.response?.data || "Failed to check profile completion!"));
  }
}

// ✅ Watcher Saga
export function* watchCheckProfileComplete() {
  yield takeLatest(checkProfileCompleteRequest.type, handleCheckProfileComplete);
}
