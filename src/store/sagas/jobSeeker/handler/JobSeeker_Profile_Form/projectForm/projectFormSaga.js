
import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  getProjectExperienceApi,
  addProjectExperienceApi,
  updateProjectExperienceApi,
  deleteProjectExperienceApi
} from "./../../../request/JobSeeker_Profile_Form/projectFormRequest/projectFormRequest";

import {
  addProjectExperienceFailure,
  addProjectExperienceRequest,
  addProjectExperienceSuccess,
  getProjectExperienceFailure,
  getProjectExperienceRequest,
  getProjectExperienceSuccess,
  updateProjectExperienceFailure,
  updateProjectExperienceRequest,
  updateProjectExperienceSuccess,
  deleteProjectExperienceFailure,
  deleteProjectExperienceRequest,
  deleteProjectExperienceSuccess
} from "./../../../../../slices/jobSeeker/Profile_Form/projectSlice";

// ✅ Selector to get auth token
const getAuthToken = (state) => state.jobSeekerAuth.token;

// ✅ Handle GET Project Experience
function* handleGetProjectExperience() {
  try {
    const token = yield select(getAuthToken);
    const response = yield call(getProjectExperienceApi, token);
    yield put(getProjectExperienceSuccess(response));
  } catch (error) {
    yield put(getProjectExperienceFailure(error));
  }
}

// ✅ Handle ADD Project Experience
function* handleAddProjectExperience(action) {
  try {
    const token = yield select(getAuthToken);
    const response = yield call(addProjectExperienceApi, action.payload, token);
    yield put(addProjectExperienceSuccess(response));
    yield put(getProjectExperienceRequest()); // Fetch updated data
  } catch (error) {
    yield put(addProjectExperienceFailure(error));
  }
}

// ✅ Handle UPDATE Project Experience
function* handleUpdateProjectExperience(action) {
  try {
    const token = yield select(getAuthToken);
    const { finalEditIndex, updatedData } = action.payload;
    const response = yield call(updateProjectExperienceApi, finalEditIndex, updatedData, token);
    yield put(updateProjectExperienceSuccess(response));
    yield put(getProjectExperienceRequest()); // Fetch updated data
  } catch (error) {
    yield put(updateProjectExperienceFailure(error));
  }
}

// ✅ Handle DELETE Project Experience
function* handleDeleteProjectExperience(action) {
  try {
    const token = yield select(getAuthToken);
    const response = yield call(deleteProjectExperienceApi, action.payload, token);
    yield put(deleteProjectExperienceSuccess(response));
    yield put(getProjectExperienceRequest()); // Fetch updated data
  } catch (error) {
    yield put(deleteProjectExperienceFailure(error));
  }
}

// ✅ Watcher Saga
export function* watchProjectDetail() {
  yield takeLatest(getProjectExperienceRequest.type, handleGetProjectExperience);
  yield takeLatest(addProjectExperienceRequest.type, handleAddProjectExperience);
  yield takeLatest(updateProjectExperienceRequest.type, handleUpdateProjectExperience);
  yield takeLatest(deleteProjectExperienceRequest.type, handleDeleteProjectExperience);
}
