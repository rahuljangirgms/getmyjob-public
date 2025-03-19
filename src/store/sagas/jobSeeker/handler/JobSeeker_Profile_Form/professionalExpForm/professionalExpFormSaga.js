import { call, put, takeLatest, select } from "redux-saga/effects";
import {
    getProfessionalExperienceApi,
    addProfessionalExperienceApi,
    updateProfessionalExperienceApi,
    deleteProfessionalExperienceApi
} from "./../../../request/JobSeeker_Profile_Form/professionalExpFormRequest/professionalExpFormRequest";

import {
    getProfessionalExperienceRequest, getProfessionalExperienceSuccess, getProfessionalExperienceFailure,
    addProfessionalExperienceRequest, addProfessionalExperienceSuccess, addProfessionalExperienceFailure,
    updateProfessionalExperienceRequest, updateProfessionalExperienceSuccess, updateProfessionalExperienceFailure,
    deleteProfessionalExperienceRequest, deleteProfessionalExperienceSuccess, deleteProfessionalExperienceFailure
} from "./../../../../../slices/jobSeeker/Profile_Form/professionalExpSlice";

// ✅ Selector to get auth token
const getAuthToken = (state) => state.jobSeekerAuth.token;

// ✅ Handle GET Professional Experience
function* handleGetProfessionalExperience() {
    try {
        const token = yield select(getAuthToken);
        const response = yield call(getProfessionalExperienceApi, token);
        yield put(getProfessionalExperienceSuccess(response));
    } catch (error) {
        yield put(getProfessionalExperienceFailure(error));
    }
}

// ✅ Handle ADD Professional Experience
function* handleAddProfessionalExperience(action) {
    try {
        const token = yield select(getAuthToken);
        const response = yield call(addProfessionalExperienceApi, action.payload, token);
        yield put(addProfessionalExperienceSuccess(response));
        yield put(getProfessionalExperienceRequest()); // Fetch updated data
    } catch (error) {
        yield put(addProfessionalExperienceFailure(error));
    }
}

// ✅ Handle UPDATE Professional Experience
function* handleUpdateProfessionalExperience(action) {
    console.log("Exp data to update: ", action.payload);
    try {
        const token = yield select(getAuthToken);
        const {finalEditIndex,updatedData} = action.payload;

        
        const response = yield call(updateProfessionalExperienceApi, finalEditIndex, updatedData, token);
        yield put(updateProfessionalExperienceSuccess(response));
        yield put(getProfessionalExperienceRequest()); // Fetch updated data
    } catch (error) {
        yield put(updateProfessionalExperienceFailure(error));
    }
}

// ✅ Handle DELETE Professional Experience
function* handleDeleteProfessionalExperience(action) {
    try {
        const token = yield select(getAuthToken);
        const response = yield call(deleteProfessionalExperienceApi, action.payload, token);
        yield put(deleteProfessionalExperienceSuccess(response));
        yield put(getProfessionalExperienceRequest()); // Fetch updated data
    } catch (error) {
        yield put(deleteProfessionalExperienceFailure(error));
    }
}

// ✅ Watcher Saga
export function* watchProfessionalExperience() {
    yield takeLatest(getProfessionalExperienceRequest.type, handleGetProfessionalExperience);
    yield takeLatest(addProfessionalExperienceRequest.type, handleAddProfessionalExperience);
    yield takeLatest(updateProfessionalExperienceRequest.type, handleUpdateProfessionalExperience);
    yield takeLatest(deleteProfessionalExperienceRequest.type, handleDeleteProfessionalExperience);
}
