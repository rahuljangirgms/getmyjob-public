import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import jobReducer from './slices/jobSlice';
import authReducer from "./slices/authSlice";
import profileFormReducer from './slices/profileFormsSlice';
import resumeReducer from './slices/resumeSlice';
import quizReducer from './slices/quizSlice';
import jobSeekerAuthReducer from './slices/jobSeeker/authentication/jobSeekerAuthSlice';
import personalInfoReducer from './slices/jobSeeker/Profile_Form/personalInfoSlice';
import contactInfoReducer from './slices/jobSeeker/Profile_Form/contactInfoSlice';
import EducationInfoReducer from './slices/jobSeeker/Profile_Form/educationInfoSlice';
import addDocumentsReducer from './slices/jobSeeker/Profile_Form/documentsSlice';
import profExperinceReducer from './slices/jobSeeker/Profile_Form/professionalExpSlice';
import internshipExpReducer from './slices/jobSeeker/Profile_Form/internshipExpSlice';
import projectFormReducer from './slices/jobSeeker/Profile_Form/projectSlice';
import researchPaperReducer from './slices/jobSeeker/Profile_Form/researchPaperSlice';

// Create Saga Middleware
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    jobs: jobReducer, 
    auth: authReducer,
    profileForms: profileFormReducer,
    resume: resumeReducer,
    quiz: quizReducer,
    jobSeekerAuth: jobSeekerAuthReducer,
    // create profile -> personal Info
    personalInfoForm: personalInfoReducer,
    // create profile -> contact Info
    contactInfoForm: contactInfoReducer,
    // create profile -> Education Info
    educationInfoForm: EducationInfoReducer,
    // create profile -> add documents
    documentsInfoForm: addDocumentsReducer,
    // create profile -> Professional Exp. Info
    profExpForm: profExperinceReducer,
    // create profile -> Internship Exp. Info
    intershipExpForm: internshipExpReducer,
    // create profile -> Project Details
    projectForm: projectFormReducer,
    // create profile -> Research Paper Details
    researchPaperForm: researchPaperReducer,


  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run Saga Middleware
sagaMiddleware.run(rootSaga);

export default store;
