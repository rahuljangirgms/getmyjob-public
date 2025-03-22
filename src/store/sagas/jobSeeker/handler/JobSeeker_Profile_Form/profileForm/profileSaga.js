import { call, put, takeLatest, select } from "redux-saga/effects";
import { getPersonalInfoApi, savePersonalInfoApi } from '../../../request/JobSeeker_Profile_Form/profileFormRequest/profileFormRequest';
import { 
  postpersonalInfoRequest, 
  postpersonalInfoFailure, 
  postpersonalInfoSuccess, 
  getpersonalInfoRequest, 
  getpersonalInfoFailure, 
  getpersonalInfoSuccess 
} from '../../../../../slices/jobSeeker/Profile_Form/personalInfoSlice';

//    Selector to get the token from Redux store
const getAuthToken = (state) => state.jobSeekerAuth.token;


//---  ------ ------ Personal Info Form saga

//    Saga for POST request (Save Personal Information)
function* handlePostPersonalInfo(action) {
  try {


    // Retrieve token from Redux store
    const token = yield select(getAuthToken);

    console.log("token for api call: ",token);
    // Make API call with Authorization header
    const response = yield call(savePersonalInfoApi, action.payload, token);

    const {data, status} = response.data;

    // if(status){
    //   const response = yield call(getPersonalInfoApi(token));
    //   console.log('get profile info again from profile saga', response);
    // }

    console.log("POST Response:", data);

    yield put(postpersonalInfoSuccess(data, status));

    // imediate get request after post 
    yield put(getpersonalInfoRequest());

  } catch (error) {
    console.error("POST Error:", error);
    yield put(postpersonalInfoFailure(error.response?.data || "Something went wrong!"));
  }
}

//    Saga for GET request (Fetch Personal Information)
function* handleGetPersonalInfo() {
  try {
    // Retrieve token from Redux store
    const token = yield select(getAuthToken);
    console.log("Token for API call:", token);

    // Make API call with Authorization header
    const response = yield call(getPersonalInfoApi, token);
    console.log("GET Response:", response);

    // Dispatch success action with response data
    yield put(getpersonalInfoSuccess(response));
  } catch (error) {
    console.error("GET Error:", error);
    yield put(getpersonalInfoFailure(error.response?.data || "Failed to fetch profile!"));
  }
}

//    Watcher Sagas
export function* watchPersonalInfo() {
  yield takeLatest(postpersonalInfoRequest.type, handlePostPersonalInfo);
  yield takeLatest(getpersonalInfoRequest.type, handleGetPersonalInfo);
}
