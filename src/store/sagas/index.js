import { all } from "redux-saga/effects";
import { watchFetchJobs } from "./jobSaga";
import { watchAuth } from "./authSaga";
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
import {watchOpenToWork} from './../sagas/jobSeeker/handler/Open_To_Work/openToWorkSaga';
import {watchGenrateResume} from './../sagas/jobSeeker/handler/genrate_Resume/genrateResumeSaga';
import {watchJobList} from './jobSeeker/handler/Job_List/JobListSaga'
import {watchFilterJobs} from './jobSeeker/handler/Job_Filter/JobFilterSaga';
import {watchJobApply} from './jobSeeker/handler/Job_Apply/JobApplySaga';

export default function* rootSaga() {
  yield all([
    watchFetchJobs(),
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
    watchOpenToWork(),
    watchGenrateResume(),
    watchJobList(),
    watchFilterJobs(),
    watchJobApply(),
  ]);
}
