import { call, put, takeLatest, select } from "redux-saga/effects";

import {
  getInternshipExperienceApi,
  addInternshipExperienceApi,
  updateInternshipExperienceApi,
  deleteInternshipExperienceApi,
} from "./../../../request/JobSeeker_Profile_Form/InternshipExpRequest/InternshipExpRequest";

import {
  addinternshipExperienceFailure,
  addinternshipExperienceRequest,
  addinternshipExperienceSuccess,
  getinternshipExperienceFailure,
  getinternshipExperienceRequest,
  getinternshipExperienceSuccess,
  updateinternshipExperienceFailure,
  updateinternshipExperienceRequest,
  updateinternshipExperienceSuccess,
  deleteinternshipExperienceFailure,
  deleteinternshipExperienceRequest, 
  deleteinternshipExperienceSuccess
} from "./../../../../../slices/jobSeeker/Profile_Form/internshipExpSlice";

// IMPOPRT Slices

// ✅ Selector to get auth token
const getAuthToken = (state) => state.jobSeekerAuth.token;

// ✅ Handle GET Professional Experience
function* handleGetInternshipExperience() {
  try {
    const token = yield select(getAuthToken);
    const response = yield call(getInternshipExperienceApi, token);
    yield put(getinternshipExperienceSuccess(response));
  } catch (error) {
    yield put(getinternshipExperienceFailure(error));
  }
}

// ✅ Handle ADD Professional Experience
function* handleAddInternshipExperience(action) {
  try {
    const token = yield select(getAuthToken);
    const response = yield call(
      addInternshipExperienceApi,
      action.payload,
      token
    );
    yield put(addinternshipExperienceSuccess(response));
    yield put(getinternshipExperienceRequest()); // Fetch updated data
  } catch (error) {
    yield put(addinternshipExperienceFailure(error));
  }
}

// ✅ Handle UPDATE Professional Experience
function* handleUpdateInternshipExperience(action) {
  console.log("Exp data to update: ", action.payload);
  try {
    const token = yield select(getAuthToken);
    const { finalEditIndex, updatedData } = action.payload;

    const response = yield call(
      updateInternshipExperienceApi,
      finalEditIndex,
      updatedData,
      token
    );
    yield put(updateinternshipExperienceSuccess(response));
    yield put(getinternshipExperienceRequest()); // Fetch updated data
  } catch (error) {
    yield put(updateinternshipExperienceFailure(error));
  }
}

// ✅ Handle DELETE Professional Experience
function* handleDeleteInternshipExperience(action) {
  try {
    const token = yield select(getAuthToken);
    const response = yield call(
      deleteInternshipExperienceApi,
      action.payload,
      token
    );
    yield put(deleteinternshipExperienceSuccess(response));
    yield put(getinternshipExperienceRequest()); // Fetch updated data
  } catch (error) {
    yield put(deleteinternshipExperienceFailure(error));
  }
}

// ✅ Watcher Saga
export function* watchInternshipExperience() {
  yield takeLatest(
    getinternshipExperienceRequest.type,
    handleGetInternshipExperience
  );
  yield takeLatest(
    addinternshipExperienceRequest.type,
    handleAddInternshipExperience
  );
  yield takeLatest(
    updateinternshipExperienceRequest.type,
    handleUpdateInternshipExperience
  );
  yield takeLatest(
    deleteinternshipExperienceRequest.type,
    handleDeleteInternshipExperience
  );
}
