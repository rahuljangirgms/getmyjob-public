import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  getTrainingApi,
  addTrainingApi,
  updateTrainingApi,
  deleteTrainingApi
} from "./../../../request/JobSeeker_Profile_Form/traningFormRequest/traningFormRequest";

import {
  addTrainingFailure,
  addTrainingRequest,
  addTrainingSuccess,
  getTrainingFailure,
  getTrainingRequest,
  getTrainingSuccess,
  updateTrainingFailure,
  updateTrainingRequest,
  updateTrainingSuccess,
  deleteTrainingFailure,
  deleteTrainingRequest,
  deleteTrainingSuccess
} from "./../../../../../slices/jobSeeker/Profile_Form/trainingSlice";

// ✅ Selector to get auth token
const getAuthToken = (state) => state.jobSeekerAuth.token;

// ✅ Handle GET Training
function* handleGetTraining() {
  try {
    const token = yield select(getAuthToken);
    const response = yield call(getTrainingApi, token);
    yield put(getTrainingSuccess(response));
  } catch (error) {
    yield put(getTrainingFailure(error));
  }
}

// ✅ Handle ADD Training
function* handleAddTraining(action) {
  try {
    const token = yield select(getAuthToken);
    const response = yield call(addTrainingApi, action.payload, token);
    yield put(addTrainingSuccess(response));
    yield put(getTrainingRequest()); // Fetch updated data
  } catch (error) {
    yield put(addTrainingFailure(error));
  }
}

// ✅ Handle UPDATE Training
function* handleUpdateTraining(action) {
  try {
    const token = yield select(getAuthToken);
    const { finalEditIndex, updatedData } = action.payload;
    const response = yield call(updateTrainingApi, finalEditIndex, updatedData, token);
    yield put(updateTrainingSuccess(response));
    yield put(getTrainingRequest()); // Fetch updated data
  } catch (error) {
    yield put(updateTrainingFailure(error));
  }
}

// ✅ Handle DELETE Training
function* handleDeleteTraining(action) {
  try {
    const token = yield select(getAuthToken);
    const response = yield call(deleteTrainingApi, action.payload, token);
    yield put(deleteTrainingSuccess(response));
    yield put(getTrainingRequest()); // Fetch updated data
  } catch (error) {
    yield put(deleteTrainingFailure(error));
  }
}

// ✅ Watcher Saga
export function* watchTraining() {
  yield takeLatest(getTrainingRequest.type, handleGetTraining);
  yield takeLatest(addTrainingRequest.type, handleAddTraining);
  yield takeLatest(updateTrainingRequest.type, handleUpdateTraining);
  yield takeLatest(deleteTrainingRequest.type, handleDeleteTraining);
}
