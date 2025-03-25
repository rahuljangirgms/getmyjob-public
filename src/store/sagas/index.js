import { all } from "redux-saga/effects";
// import { watchFetchJobs } from "./jobSaga";
// import { watchJobs } from "./recruiter/jobSaga";
// import { watchAuth } from "./authSaga";
import {watchJobSeekerAuth} from './../sagas/jobSeeker/handler/authSaga'
import {watchPersonalInfo} from './../sagas/jobSeeker/handler/JobSeeker_Profile_Form/profileForm/profileSaga'
import {watchContactInfo} from './../sagas/jobSeeker/handler/JobSeeker_Profile_Form/contactForm/contactFromSaga'
import {watchEducationInfo} from './../sagas/jobSeeker/handler/JobSeeker_Profile_Form/educationForm/educationSaga'
import {watchUploadDocument} from './../sagas/jobSeeker/handler/JobSeeker_Profile_Form/addDocument/addDocumentSaga';
import {watchProfessionalExperience} from './../sagas/jobSeeker/handler/JobSeeker_Profile_Form/professionalExpForm/professionalExpFormSaga';
import {watchInternshipExperience} from './../sagas/jobSeeker/handler/JobSeeker_Profile_Form/InternshipExpForm/InternshipExpFormSaga';
import {watchProjectDetail} from './../sagas/jobSeeker/handler/JobSeeker_Profile_Form/projectForm/projectFormSaga';
import {watchResearchPaper} from './../sagas/jobSeeker/handler/JobSeeker_Profile_Form/researchPaperForm/researchPaperForm';
import {watchTraining} from './../sagas/jobSeeker/handler/JobSeeker_Profile_Form/traningForm/traningFormSaga';
import {watchCertification} from './../sagas/jobSeeker/handler/JobSeeker_Profile_Form/certificationForm/certificationFormSaga';
import {watchOtherDetails} from './../sagas/jobSeeker/handler/JobSeeker_Profile_Form/otherDetailsForm/otherDetailsFormSaga'
import {watchMasterResume} from './../sagas/jobSeeker/handler/master_Resume_Data/masterResumeSaga';
import {watchCheckProfileComplete} from './../sagas/jobSeeker/handler/check_Profile_completed/isProfileCompleteSaga';
import { watchJobs } from "./recruiter/jobSaga";
import { watchAuth } from "./recruiter/authSaga";
import { watchCompany } from "./recruiter/companySaga";
import { watchCandidates } from "./recruiter/candidateSaga";
import { watchUserSagas } from "./recruiter/userSaga";
import { watchRoleSagas } from './recruiter/roleSaga';



export default function* rootSaga() {
  yield all([
    watchJobs(),
    watchAuth(),
    watchJobSeekerAuth(),
    watchPersonalInfo(),
    watchContactInfo(),
    watchEducationInfo(),
    watchUploadDocument(),
    watchProfessionalExperience(),
    watchInternshipExperience(),
    watchProjectDetail(),
    watchResearchPaper(),
    watchTraining(),
    watchCertification(),
    watchOtherDetails(),
    watchMasterResume(),
    watchCheckProfileComplete(),
    watchCompany(),
    watchCandidates(),
    watchUserSagas(),
    watchRoleSagas(),
    // watchRoleSagas(),
  ]);
}
