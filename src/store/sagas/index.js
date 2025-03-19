import { all } from "redux-saga/effects";
import { watchFetchJobs } from "./jobSaga";
import { watchAuth } from "./authSaga";
import {watchJobSeekerAuth} from './../sagas/jobSeeker/handler/authSaga'
import {watchPersonalInfo} from './../sagas/jobSeeker/handler/JobSeeker_Profile_Form/profileForm/profileSaga'
import {watchContactInfo} from './../sagas/jobSeeker/handler/JobSeeker_Profile_Form/contactForm/contactFromSaga'
import {watchEducationInfo} from './../sagas/jobSeeker/handler/JobSeeker_Profile_Form/educationForm/educationSaga'
import {watchAddDocuments} from './../sagas/jobSeeker/handler/JobSeeker_Profile_Form/addDocument/addDocumentSaga';
import {watchProfessionalExperience} from './../sagas/jobSeeker/handler/JobSeeker_Profile_Form/professionalExpForm/professionalExpFormSaga';
import {watchInternshipExperience} from './../sagas/jobSeeker/handler/JobSeeker_Profile_Form/InternshipExpForm/InternshipExpFormSaga';
import {watchProjectDetail} from './../sagas/jobSeeker/handler/JobSeeker_Profile_Form/projectForm/projectFormSaga';
import {watchResearchPaper} from './../sagas/jobSeeker/handler/JobSeeker_Profile_Form/researchPaperForm/researchPaperForm';

export default function* rootSaga() {
  yield all([
    watchFetchJobs(),
    watchAuth(),
    watchJobSeekerAuth(),
    watchPersonalInfo(),
    watchContactInfo(),
    watchEducationInfo(),
    watchAddDocuments(),
    watchProfessionalExperience(),
    watchInternshipExperience(),
    watchProjectDetail(),
    watchResearchPaper(),
  ]);
}
