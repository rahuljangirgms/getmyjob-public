import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  uploadResumeRequest,
  uploadResumeSuccess,
  uploadResumeFailure,
  getResumeListRequest,
  getResumeListSuccess,
  getResumeListFailure,
  deleteResumeFailure,
  deleteResumeRequest,
  deleteResumeSuccsess,
} from "./../../../../slices/jobSeeker/genrateResume/genrateResumeSlice";

import {
  uploadResumeApi,
  getResumesApi,
  deleteResumeApi
} from "./../../request/genrate_Resume_Request/genrateResumeRequest";

const getToken = (state) => state.jobSeekerAuth.token;

// POST resume with PDF
function* handleUploadResume(action) {
  try {
    const token = yield select(getToken);
    const { resumeName, resumeData, pdfBlob } = action.payload;

    //console.log("Content To Post At Saga : " ,resumeData, " ", resumeName, " ", pdfBlob);

    const response = yield call(uploadResumeApi, {
      resumeData,
      resumeName, 
      pdfBlob,
      token,
    });

    yield put(uploadResumeSuccess(response));
  } catch (error) {
    yield put(uploadResumeFailure(error?.message || "Failed to upload resume"));
  }
}

// GET resumes list
function* handleGetResumes() {
  try {
    const token = yield select(getToken);
    const response = yield call(getResumesApi, token);
    yield put(getResumeListSuccess(response));
  } catch (error) {
    yield put(getResumeListFailure(error?.message || "Failed to fetch resumes"));
  }
}


// POST request to Delete Resume

function* handleDeleteResume(action) {
  try {
    const token = yield select(getToken);
    const response = yield call(deleteResumeApi, action.payload, token);
    yield put(deleteResumeSuccsess(response));
    yield call(getResumeListRequest());

  } catch (error) {
    yield put(deleteResumeFailure(error?.message || "Failed to delete Resume"));
  }
}


export function* watchGenrateResume() {
  yield takeLatest(uploadResumeRequest.type, handleUploadResume);
  yield takeLatest(getResumeListRequest.type, handleGetResumes);
  yield takeLatest(deleteResumeRequest.type, handleDeleteResume);
}


