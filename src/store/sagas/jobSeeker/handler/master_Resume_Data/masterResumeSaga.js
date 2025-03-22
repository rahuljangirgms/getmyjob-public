import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  getMasterResumeApi,
} from "./../../request/master_Resume_Request/masterResumeRequest";

import {
  getMasterResumeRequest,
  getMasterResumeSuccess,
  getMasterResumeFailure,
} from "./../../../../slices/jobSeeker/master_Resume_Data/masterResumeSlice";

// ✅ Selector to get auth token
const getAuthToken = (state) => state.jobSeekerAuth.token;

// ✅ Handle GET Master Resume
function* handleGetMasterResume() {
  try {
    const token = yield select(getAuthToken);
    const response = yield call(getMasterResumeApi, token);
    yield put(getMasterResumeSuccess(response));
  } catch (error) {
    yield put(getMasterResumeFailure(error));
  }
}

// ✅ Watcher Saga
export function* watchMasterResume() {
  yield takeLatest(getMasterResumeRequest.type, handleGetMasterResume);
}
