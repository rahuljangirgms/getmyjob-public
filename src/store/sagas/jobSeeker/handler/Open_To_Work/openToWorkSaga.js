import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  setOpenToWorkApi,
  getOpenToWorkApi,
} from "./../../request/Open_To_Work_Request/openToWorkRequest";

import {
  setOpenToWorkRequest,
  setOpenToWorkSuccsess,
  setOpenToWorkFailure,
  getOpenToWorkRequest,
  getOpenToWorkSuccess,
  getOpenToWorkFailure,
} from "./../../../../slices/jobSeeker/openToWork/openToWorkSlice";

const getAuthToken = (state) => state.jobSeekerAuth.token;

// ✅ SET Open To Work Handler
function* handleSetOpenToWork(action) {
  try {
    const token = yield select(getAuthToken);
    const response = yield call(setOpenToWorkApi, action.payload, token);
    const { status, message } = response;

    yield put(setOpenToWorkSuccsess({ status, message }));
    yield put(getOpenToWorkRequest());
  } catch (error) {
    yield put(setOpenToWorkFailure(error.message || "Something went wrong"));
  }
}

// ✅ GET Open To Work Handler
function* handleGetOpenToWork() {
  try {
    const token = yield select(getAuthToken);
    const response = yield call(getOpenToWorkApi, token); // 👈 should return the open_to_work status (1/0)

    const { data } = response;
    yield put(getOpenToWorkSuccess(data));
  } catch (error) {
    yield put(getOpenToWorkFailure(error.message || "Failed to fetch status"));
  }
}

export function* watchOpenToWork() {
  yield takeLatest(setOpenToWorkRequest.type, handleSetOpenToWork);
  yield takeLatest(getOpenToWorkRequest.type, handleGetOpenToWork);
}
