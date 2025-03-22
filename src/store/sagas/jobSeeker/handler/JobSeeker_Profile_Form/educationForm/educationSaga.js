import { call, put, takeLatest, select, delay } from "redux-saga/effects";
import { saveEducationInfoApi, getEducationInfoApi, updateEducationApi, deleteEducationApi } from './../../../request/JobSeeker_Profile_Form/educationFormRequest/educationFormRequest';

import {
    postEducationInfoFailure,
    postEducationInfoRequest,
    postEducationInfoSuccess,
    getEducationInfoFailure,
    getEducationInfoRequest,
    getEducationInfoSuccess,
    updateEducationInfoFailure,
    updateEducationInfoRequest,
    updateEducationInfoSuccess,
    deleteEducationFailure,
    deleteEducationRequest,
    deleteEducationSuccess
} from "./../../../../../slices/jobSeeker/Profile_Form/educationInfoSlice";

// Selector to get the token from Redux store
const getAuthToken = (state) => state.jobSeekerAuth.token;

console.log("TOCKEN FOR Post educ",getAuthToken);

// POST Education Saga
function* handlePostEducationInfo(action) {
  try {
    const token = yield select(getAuthToken);
    const { type, data } = action.payload;

    const response = yield call(saveEducationInfoApi, data, type, token);

    console.log("POST Response:", response.data); 

    const { message, status } = response;

    yield put(postEducationInfoSuccess({ message, status }));

    yield delay(500); // ✅ Delay before fetching updated data
    yield put(getEducationInfoRequest());

  } catch (error) {
    yield put(postEducationInfoFailure(error.response?.message || "Failed to save education info!"));
  }
}


// Saga for GET request (Fetch Education Information)
function* handleGetEducationInfo() {
  try {
    const token = yield select(getAuthToken);
    console.log("Token for API call:", token);
    
    const response = yield call(getEducationInfoApi, token);
    
    console.log("GET Response:", response.data); // Debugging API response
    
    const { status, data } = response.data;  // Ensure correct destructuring

    if (!data) {
      console.warn("Warning: GET API returned null data.");
    }
    
    yield put(getEducationInfoSuccess({ status, data }));
  } catch (error) {
    console.error("GET Error:", error);
    yield put(getEducationInfoFailure(error.response?.data || "Failed to fetch education info!"));
  }
}



// UPDATE Education Saga
function* handleUpdateEducationInfo(action) {
  try {
    const token = yield select(getAuthToken);
    const { id, data } = action.payload;

    const response = yield call(updateEducationApi, id, data, token);

    console.log("Update education response:", response.data);

    const { status, message } = response.data;

    yield put(updateEducationInfoSuccess({ status, message }));

    yield put(getEducationInfoRequest());

  } catch (error) {
    console.error("Error While Updating education info:", error);
    yield put(updateEducationInfoFailure({ message: error.response?.data || "Failed to update education details" }));
  }
}


// DELETE Education Saga
function* handleDeleteEducationInfo(action) {
  try {
    const token = yield select(getAuthToken);
    const { id } = action.payload;

    const response = yield call(deleteEducationApi, id, token);

    console.log("Delete education response:", response.data);

    const { status, message } = response.data;

    yield put(deleteEducationSuccess({ status, message }));

    yield put(getEducationInfoRequest());

  } catch (error) {
    console.error("Error While Deleting education info:", error);
    yield put(deleteEducationFailure({ message: error.response?.data || "Failed to delete education details" }));
  }
}




// Watcher Sagas
export function* watchEducationInfo() {
  yield takeLatest(postEducationInfoRequest.type, handlePostEducationInfo);
  yield takeLatest(getEducationInfoRequest.type, handleGetEducationInfo);
  yield takeLatest(updateEducationInfoRequest.type, handleUpdateEducationInfo);
  yield takeLatest(deleteEducationRequest.type, handleDeleteEducationInfo);
}
