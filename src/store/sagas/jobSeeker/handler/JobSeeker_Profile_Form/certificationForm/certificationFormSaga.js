import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  getCertificationApi,
  addCertificationApi,
  updateCertificationApi,
  deleteCertificationApi
} from "./../../../request/JobSeeker_Profile_Form/certificationFormRequest/certificationFormRequest";

import {
  addCertificationFailure,
  addCertificationRequest,
  addCertificationSuccess,
  getCertificationFailure,
  getCertificationRequest,
  getCertificationSuccess,
  updateCertificationFailure,
  updateCertificationRequest,
  updateCertificationSuccess,
  deleteCertificationFailure,
  deleteCertificationRequest,
  deleteCertificationSuccess
} from "./../../../../../slices/jobSeeker/Profile_Form/certificationSlice";

// ✅ Selector to get auth token
const getAuthToken = (state) => state.jobSeekerAuth.token;

// ✅ Handle GET Certification
function* handleGetCertification() {
  try {
    const token = yield select(getAuthToken);
    const response = yield call(getCertificationApi, token);
    yield put(getCertificationSuccess(response));
  } catch (error) {
    yield put(getCertificationFailure(error));
  }
}

// ✅ Handle ADD Certification
function* handleAddCertification(action) {
  try {
    const token = yield select(getAuthToken);
    const response = yield call(addCertificationApi, action.payload, token);
    yield put(addCertificationSuccess(response));
    yield put(getCertificationRequest()); // Fetch updated data
  } catch (error) {
    yield put(addCertificationFailure(error));
  }
}

// ✅ Handle UPDATE Certification
function* handleUpdateCertification(action) {
  try {
    const token = yield select(getAuthToken);
    const { finalEditIndex, updatedData } = action.payload;
    const response = yield call(updateCertificationApi, finalEditIndex, updatedData, token);
    yield put(updateCertificationSuccess(response));
    yield put(getCertificationRequest()); // Fetch updated data
  } catch (error) {
    yield put(updateCertificationFailure(error));
  }
}

// ✅ Handle DELETE Certification
function* handleDeleteCertification(action) {
  try {
    const token = yield select(getAuthToken);
    const response = yield call(deleteCertificationApi, action.payload, token);
    yield put(deleteCertificationSuccess(response));
    yield put(getCertificationRequest()); // Fetch updated data
  } catch (error) {
    yield put(deleteCertificationFailure(error));
  }
}

// ✅ Watcher Saga
export function* watchCertification() {
  yield takeLatest(getCertificationRequest.type, handleGetCertification);
  yield takeLatest(addCertificationRequest.type, handleAddCertification);
  yield takeLatest(updateCertificationRequest.type, handleUpdateCertification);
  yield takeLatest(deleteCertificationRequest.type, handleDeleteCertification);
}
