import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  getResearchPaperApi,
  addResearchPaperApi,
  updateResearchPaperApi,
  deleteResearchPaperApi
} from "./../../../request/JobSeeker_Profile_Form/researchPaperFormRequest/researchPaperFormRequest";

import {
  addResearchPaperFailure,
  addResearchPaperRequest,
  addResearchPaperSuccess,
  getResearchPaperFailure,
  getResearchPaperRequest,
  getResearchPaperSuccess,
  updateResearchPaperFailure,
  updateResearchPaperRequest,
  updateResearchPaperSuccess,
  deleteResearchPaperFailure,
  deleteResearchPaperRequest,
  deleteResearchPaperSuccess
} from "./../../../../../slices/jobSeeker/Profile_Form/researchPaperSlice";

// ✅ Selector to get auth token
const getAuthToken = (state) => state.jobSeekerAuth.token;

// ✅ Handle GET Research Papers
function* handleGetResearchPaper() {
  try {
    const token = yield select(getAuthToken);
    const response = yield call(getResearchPaperApi, token);
    yield put(getResearchPaperSuccess(response));
  } catch (error) {
    yield put(getResearchPaperFailure(error));
  }
}

// ✅ Handle ADD Research Paper
function* handleAddResearchPaper(action) {
  try {
    const token = yield select(getAuthToken);
    const response = yield call(addResearchPaperApi, action.payload, token);
    yield put(addResearchPaperSuccess(response));
    yield put(getResearchPaperRequest()); // Fetch updated data
  } catch (error) {
    yield put(addResearchPaperFailure(error));
  }
}

// ✅ Handle UPDATE Research Paper
function* handleUpdateResearchPaper(action) {
  try {
    const token = yield select(getAuthToken);
    const { finalEditIndex, updatedData } = action.payload;
    const response = yield call(updateResearchPaperApi, finalEditIndex, updatedData, token);
    yield put(updateResearchPaperSuccess(response));
    yield put(getResearchPaperRequest()); // Fetch updated data
  } catch (error) {
    yield put(updateResearchPaperFailure(error));
  }
}

// ✅ Handle DELETE Research Paper
function* handleDeleteResearchPaper(action) {

  console.log("Paper to delete: ",action.payload);
  try {
    const token = yield select(getAuthToken);
    const response = yield call(deleteResearchPaperApi, action.payload, token);
    yield put(deleteResearchPaperSuccess(response));
    yield put(getResearchPaperRequest()); // Fetch updated data
  } catch (error) {
    yield put(deleteResearchPaperFailure(error));
  }
}

// ✅ Watcher Saga
export function* watchResearchPaper() {
  yield takeLatest(getResearchPaperRequest.type, handleGetResearchPaper);
  yield takeLatest(addResearchPaperRequest.type, handleAddResearchPaper);
  yield takeLatest(updateResearchPaperRequest.type, handleUpdateResearchPaper);
  yield takeLatest(deleteResearchPaperRequest.type, handleDeleteResearchPaper);
}
