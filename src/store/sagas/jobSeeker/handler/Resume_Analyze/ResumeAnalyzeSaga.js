import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  getResumeByIdFailure,
  getResumeByIdRequest,
  getResumeByIdSuccess, 
  getResumeAnalysisFailure,
  getResumeAnalysisRequest,
  getResumeAnalysisSuccess
} from "./../../../../slices/jobSeeker/resume_Analyze/resumeAnalyzeSlice";
import { getResumeByIdApi,getResumeAnalysisApi } from "./../../request/Resume_Analyze_Request/ResumeAnalyzeRequest";

const getToken = (state) => state.jobSeekerAuth.token;

// for POST request get resume by id

function* handleGetResumeById(action) {
  try {
    const token = yield select(getToken);
    const {id, bash_id} = action.payload;
    const data = yield call(getResumeByIdApi, id, bash_id, token);
    yield put(getResumeByIdSuccess(data));
  } catch (error) {
    yield put(getResumeByIdFailure(error?.message || "Failed to fetch resume"));
  }
}


function* handleGetResumeAnalysis(action) {
  try {
    const token = yield select(getToken);
    const {id, bash_id} = action.payload;

    const response = yield call(getResumeAnalysisApi, id, bash_id, token);

    yield put(getResumeAnalysisSuccess(response));
  } catch (error) {
    yield put(getResumeAnalysisFailure(error.message || 'Analysis failed'));
  }
}

export function* watchResumeAnalyzer() {
  yield takeLatest(getResumeByIdRequest.type, handleGetResumeById);
  yield takeLatest(getResumeAnalysisRequest.type, handleGetResumeAnalysis);
}
