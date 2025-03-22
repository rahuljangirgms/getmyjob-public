import { all } from "redux-saga/effects";
import { watchJobs } from "./recruiter/jobSaga";
import { watchAuth } from "./recruiter/authSaga";
import { watchCompany } from "./recruiter/companySaga";
import { watchCandidates } from "./recruiter/candidateSaga";
import { watchUserSagas } from "./recruiter/userSaga";
import { watchRoleSagas } from './recruiter/userSaga';

export default function* rootSaga() {
  yield all([
    watchJobs(),
    watchAuth(),
    watchCompany(),
    watchCandidates(),
    watchUserSagas(),
    // watchRoleSagas(),
  ]);
}
