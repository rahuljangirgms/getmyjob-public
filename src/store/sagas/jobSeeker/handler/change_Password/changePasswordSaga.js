import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,
} from "./../../../../slices/jobSeeker/changePassword/changePassowordSlice";
import { changePasswordApi } from './../../request/change_Password_request/changePasswordRequest';


const getToken = (state) => state.jobSeekerAuth.token;

function* handleChangePassword(action) {
  try {
    const token = yield select(getToken);

    const {email, oldpassword, newPassword} = action.payload;

    const response = yield call(changePasswordApi, email, oldpassword, newPassword, token);
    yield put(changePasswordSuccess(response));
  } catch (error) {
    yield put(changePasswordFailure(error?.response?.data?.message || "Failed to change password"));
  }
}

export function* watchChangePassword() {
  yield takeLatest(changePasswordRequest.type, handleChangePassword);
}
