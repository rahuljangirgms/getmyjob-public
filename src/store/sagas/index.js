import { all } from "redux-saga/effects";
import { watchJobs } from "./jobSaga";
import { watchAuth } from "./authSaga";
import { watchCompany } from "./companySaga";



export default function* rootSaga() {
  yield all([
    watchJobs(),
    watchAuth(),
    watchCompany(),
  ]);
}
