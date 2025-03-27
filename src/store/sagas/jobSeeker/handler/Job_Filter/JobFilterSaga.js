import { call, put, takeLatest, select } from "redux-saga/effects";

import { filterJobsApi } from './../../request/Job_Filter_Request/JobFilterRequest';

import {filterJobsFailure, filterJobsRequest, filterJobsSuccess} from './../../../../slices/jobSeeker/job_Filter/jobFilterSlice';


const getToken = (state) => state.jobSeekerAuth.token;

function* handleFilterJobs(action) {
  try {

    const {jobType, salary, workLocation,job_title} = action.payload;

    const token = yield select(getToken);

    const response = yield call(filterJobsApi, jobType, salary, workLocation,job_title, token);
    yield put(filterJobsSuccess(response.data));
  } catch (error) {
    yield put(filterJobsFailure(error.message || "Job filter failed"));
  }
}

export function* watchFilterJobs() {
  yield takeLatest(filterJobsRequest.type, handleFilterJobs);
}
