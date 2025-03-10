import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import jobReducer from './slices/jobSlice';
import authReducer from "./slices/authSlice";
import profileFormReducer from './slices/profileFormsSlice';
import resumeReducer from './slices/resumeSlice';
import quizReducer from './slices/quizSlice';
import jobSeekerAuthReducer from './slices/jobSeeker/authentication/jobSeekerAuthSlice';

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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run Saga Middleware
sagaMiddleware.run(rootSaga);

export default store;
