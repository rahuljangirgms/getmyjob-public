import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import jobReducer from './slices/recruiter/jobSlice';
import authReducer from "./slices/recruiter/authSlice";
import profileFormReducer from './slices/profileFormsSlice';
import companyReducer from "./slices/recruiter/companySlice";
import candidateReducer from "./slices/recruiter/candidateSlice";
import userReducer from "./slices/recruiter/userSlice";

// Create Saga Middleware
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    jobs: jobReducer, 
    auth: authReducer,
    profileForms: profileFormReducer,
    companies: companyReducer, // ✅ Add company reducer
    candidates: candidateReducer, // Make sure this is added
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({  serializableCheck: false,thunk: false }).concat(sagaMiddleware),
});

// Run Saga Middleware
sagaMiddleware.run(rootSaga);

export default store;
