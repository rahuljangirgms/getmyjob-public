import { call, put, takeLatest, select } from 'redux-saga/effects';
import {applyJobFailure, applyJobRequest, applyJobSuccess} from './../../../../slices/jobSeeker/Job_Apply/jobApplySlice';
import { applyJobApi } from './../../request/Job_Apply_Request/JobApplyRequest';



const getToken = (state) => state.jobSeekerAuth.token;

function* handleJobApply(action) {
  try {
    const token = yield select(getToken);
    const {bash_id, id, res_id, resume_id} = action.payload;

    const response = yield call(applyJobApi, bash_id, id, resume_id, token);
    yield put(applyJobSuccess(response));
  } catch (error) {
    yield put(applyJobFailure(error?.message || 'Job application failed.'));
  }
}

export function* watchJobApply() {
  yield takeLatest(applyJobRequest.type, handleJobApply);
}
