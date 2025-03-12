import { all } from "redux-saga/effects";
import { watchFetchJobs } from "./jobSaga";
import { watchAuth } from "./authSaga";
import {watchJobSeekerAuth} from './../sagas/jobSeeker/handler/authSaga'
import {watchPersonalInfo} from './../sagas/jobSeeker/handler/profileForm/profileSaga'

export default function* rootSaga() {
  yield all([
    watchFetchJobs(),
    watchAuth(),
    watchJobSeekerAuth(),
    watchPersonalInfo()
  ]);
}
