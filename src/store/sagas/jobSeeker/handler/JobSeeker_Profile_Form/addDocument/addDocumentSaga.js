import { call, put, takeLatest, select } from "redux-saga/effects";
import {addDocumentsApi,getDocumentsApi} from './../../../request/JobSeeker_Profile_Form/addDocumentRequest/addDocumentRequest';

import {
    postDocumentsSuccess,
    postDocumentsRequest,
    postDocumentsFailure,
    getDocumentsFailure,
    getDocumentsRequest,
    getDocumentsSuccess

} from './../../../../../slices/jobSeeker/Profile_Form/documentsSlice'; 

const getAuthToken = (state) => state.jobSeekerAuth.token;

// Saga for POST request to add documents

function* handlePostDocuments(action) {  
    try {
            const token = yield select(getAuthToken);
         const data = action.payload;
        //  making POST API call to save docs
        const response = yield call(addDocumentsApi, data,token);
        const {message, status} = response.data;

        yield put(postDocumentsSuccess(message,status));

        // Immediately get docs call
        // yield put(getDocumentsRequest());
    } catch (error) {
        yield put(postDocumentsFailure(error.response?.data || "Something went wrong!"));
    }
};

// Saga for GET request to get documents

function* handleGetDocuments(){
    try {
        const token = yield select(getAuthToken);
        const response = yield call(getDocumentsApi,token);

        const {message,status,data} = response.data;

        yield put(getDocumentsSuccess({message,status,data}));
        
    } catch (error) {
        yield put(getDocumentsFailure(error.response?.data || "Failed to fetch Documents"))
    }
};


// Watcher Sagas

export function* watchAddDocuments() {
    yield takeLatest(postDocumentsRequest.type, handlePostDocuments);
    yield takeLatest(getDocumentsRequest.type, handleGetDocuments)
}



