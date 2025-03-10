import { all } from "redux-saga/effects";
import { watchFetchJobs } from "./jobSaga";
import { watchAuth } from "./authSaga";
import {watchJobSeekerAuth} from './../sagas/jobSeeker/handler/authSaga'

export default function* rootSaga() {
  yield all([
    watchFetchJobs(),
    watchAuth(),
    watchJobSeekerAuth()
  ]);
}
