import { call, put, takeLatest, select } from "redux-saga/effects";

import {
  getJobListFailure,
  getJobListRequest,
  getJobListSuccess,
  getJobDetailsSuccess,
  getJobDetailsFailure,
  getJobDetailsRequest
} from "../../../../slices/jobSeeker/job_List/jobListSlice";

import { getJobListApi, getJobDetailsApi } from "../../request/Job_List_Request/JobListRequest";

const getToken = (state) => state.jobSeekerAuth.token;

// For Post Request for Get Job List

function* handleGetJobList() {
  try {
    const token = yield select(getToken);
    const response = yield call(getJobListApi, token); // or add payload as 2nd arg

    // console.log("handleGetJobList Response: ", response);
    yield put(getJobListSuccess(response));
  } catch (error) {
    yield put(getJobListFailure(error?.message || "Failed to get Job List"));
  }
}

// POST request for Get Job Details

function* handleGetJobDetails(action) {
  try {
    const token = yield select(getToken);

    const {id, bash_id} = action.payload;

    const response = yield call(getJobDetailsApi,id, bash_id, token);

    console.log("JOB DETAILS Response: ",response);
    yield put(getJobDetailsSuccess(response));

  } catch (error) {
    yield put(getJobDetailsFailure(error?.message || "Failed to get Job Details"));
  }
}

// Watcher Function Here

export function* watchJobList() {
  yield takeLatest(getJobListRequest.type, handleGetJobList);
  yield takeLatest(getJobDetailsRequest.type, handleGetJobDetails);
}
