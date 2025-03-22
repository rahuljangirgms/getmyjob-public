import { call, put, takeLatest, select } from "redux-saga/effects";
import { uploadAttachmentApi, getDocumentsApi,deleteDocumentApi} from "./../../../request/JobSeeker_Profile_Form/addDocumentRequest/addDocumentRequest";
import {
  addDocumentRequest,
  addDocumentSuccess,
  addDocumentFailure,
  getDocumentFailure,
  getDocumentRequest,
  getDocumentSuccess,
  deleteDocumentRequest,
  deleteDocumentSuccess,
  deleteDocumentFailure
} from "./../../../../../slices/jobSeeker/Profile_Form/documentsSlice";

// Token selector
const getAuthToken = (state) => state.jobSeekerAuth.token;

// Worker Saga
function* handleUploadDocument(action) {
  try {
    const token = yield select(getAuthToken);
    const response = yield call(uploadAttachmentApi, action.payload, token);
    
    yield put(addDocumentSuccess({ message: response.message, document: action.payload, status: response.status }));
    yield put(getDocumentRequest());
  } catch (error) {
    yield put(addDocumentFailure(error));
  }
}


function* handleGetDocuments() {    
    try {
      const token = yield select(getAuthToken);
      const response = yield call(getDocumentsApi, token);
      yield put(getDocumentSuccess({ documents: response.data }));
    } catch (error) {
      yield put(getDocumentFailure(error));
    }
  }


function* handleDeleteDocuments(action){
  try {
    const token = yield select(getAuthToken);
  
    const response = yield call(deleteDocumentApi,action.payload, token);
    yield put(deleteDocumentSuccess({message: response.message, status: response.staus}));
    yield put(getDocumentRequest());
  } catch (error) {
    yield put(deleteDocumentFailure(error));
  }
}

// Watcher Saga
export function* watchUploadDocument() {
  yield takeLatest(addDocumentRequest.type, handleUploadDocument);
  yield takeLatest(getDocumentRequest.type, handleGetDocuments);
  yield takeLatest(deleteDocumentRequest.type, handleDeleteDocuments);
}