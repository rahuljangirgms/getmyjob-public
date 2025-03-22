import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  getOtherDetailsApi,
  addOtherDetailsApi,
} from "./../../../request/JobSeeker_Profile_Form/otherDetailsFormRequest/otherDetailsFormRequest";

import {
  addOtherDetailsFailure,
  addOtherDetailsRequest,
  addOtherDetailsSuccess,
  getOtherDetailsFailure,
  getOtherDetailsRequest,
  getOtherDetailsSuccess,
} from "./../../../../../slices/jobSeeker/Profile_Form/otherDetailsFormSlice";

// ✅ Selector to get auth token
const getAuthToken = (state) => state.jobSeekerAuth.token;

// ✅ Handle GET Other Details
function* handleGetOtherDetails() {
  try {
    const token = yield select(getAuthToken);
    const response = yield call(getOtherDetailsApi, token);
    yield put(getOtherDetailsSuccess(response));
  } catch (error) {
    yield put(getOtherDetailsFailure(error));
  }
}

// ✅ Handle ADD Other Details
function* handleAddOtherDetails(action) {
  console.log("OTHER DETAILS TO POST: ",action.payload);
  try {
    const token = yield select(getAuthToken);
    const response = yield call(addOtherDetailsApi, action.payload, token);

    const {data, message, status} = response;

    yield put(addOtherDetailsSuccess({data, message, status}));
    yield put(getOtherDetailsRequest()); // Fetch updated data
  } catch (error) {
    yield put(addOtherDetailsFailure(error));
  }
}


// ✅ Watcher Saga
export function* watchOtherDetails() {
  yield takeLatest(getOtherDetailsRequest.type, handleGetOtherDetails);
  yield takeLatest(addOtherDetailsRequest.type, handleAddOtherDetails);
}
