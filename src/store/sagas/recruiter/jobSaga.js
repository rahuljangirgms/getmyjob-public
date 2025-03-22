import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchJobsRequest,
  createJobSuccess,
  createJobFailure,
  createJobRequest,
  fetchJobsFailure, // <-- added here
  fetchJobsSuccess,
  updateJobRequest,
  updateJobFailure,
  updateJobSuccess,
  fetchInterviewRoundsRequest,
  fetchInterviewRoundsSuccess,
  fetchInterviewRoundsFailure,
  deleteJobSuccess,
  deleteJobFailure,
  deleteJobRequest,
} from "../../slices/recruiter/jobSlice";

const BASE_URL = "https://recruitment.getmysolutions.in/api/v1";
const GET_JOB_URL =`${BASE_URL}/recruiter/view_job_post`;
const GET_INTERVIEW_ROUND = `${BASE_URL}/recruiter/get_interview_round`


// New saga to fetch interview rounds
function* fetchInterviewRoundsSaga() {
  try {
    const token = yield select((state) => state.auth.token);
    const response = yield call(
      axios.get,
  GET_INTERVIEW_ROUND,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("GET_INTERVIEW_ROUND =====>",response.data.data)
    // Assuming your API returns the rounds in response.data.data
    yield put(fetchInterviewRoundsSuccess(response.data.data));
  } catch (error) {
    console.error("❌ Fetch Interview Rounds Error:", error.message);
    yield put(fetchInterviewRoundsFailure(error.message));
  }
}
// Helper: Wait until company info is loaded (with a valid id)
function* waitForCompany() {
  let company = yield select((state) => state.companies.company);
  while (!company || !company.id) {
    console.log("Waiting for company info to load...");
    yield delay(500); // wait 500ms before trying again
    company = yield select((state) => state.companies.company);
  }
  return company;
}

function* createJobSaga(action) {
  try {
    // Log job form data for debugging
    const jobData = action.payload;
    console.log("📝 Job Form Data:", jobData);

    // Retrieve user, token, and company info from Redux
    const user = yield select((state) => state.auth.user);
    const token = yield select((state) => state.auth.token);
    const company = yield select((state) => state.companies.company);

    console.log("🔑 Authenticated User:", user);
    console.log("🔑 Token:", token);
    console.log("🏢 Company from Redux:", company);

    // Check if company exists and has a valid id
  
    // If company is missing, wait until it is available
    if (!company || !company.id) {
      company = yield call(waitForCompany);
    }

    // Build the API payload by mapping form fields to API keys
    const payload = {
      user_id: user?.id || "",
      company_id: company.id, // Use company id from Redux
      job_title: jobData.title,
      contact_email: jobData.email,
      industry: jobData.industries, // expects an array (e.g., ["IT", "EV"])
      location: jobData.locations,  // expects an array (e.g., ["Pune", "Mumbai"])
      job_description: jobData.description,
      skills_required: jobData.skills,
      status: jobData.status || "Active", // default to Active if not provided
      salary_range: jobData.salary,
      is_hot_job: jobData.hotJob === "yes" ? "Yes" : "No",
      expiration_date: jobData.expirationDate,
      expiration_time: jobData.expirationTime,
      job_type: jobData.employmentType,
      experience_required: jobData.experience,
      responsibilities: jobData.responsibilities,
      round: jobData.selectedInterviewRounds, // new field sent to API
    };

    console.log("🚀 Payload to be sent:", payload);

    // Call the API endpoint with the payload and authorization header
    const response = yield call(
      axios.post,
      `${BASE_URL}/recruiter/add_job_post`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("✅ API Response:", response.data);
    const newJob = response.data.data;
    console.log("✅ Job Created:", newJob);

    yield put(createJobSuccess(newJob));
    yield put(fetchJobsRequest());
  } catch (error) {
    console.error("❌ Job Creation Error:", error.message);
    yield put(createJobFailure(error.message));
  }
}

// New saga for fetching jobs
function* getJobsSaga(action) {
  try {
    // Retrieve company and token info from Redux
    let company = yield select((state) => state.companies.company);
    const token = yield select((state) => state.auth.token);

    // Wait for company info if it's not available
    if (!company || !company.id) {
      company = yield call(waitForCompany);
    }

    // Build payload with company_id
    const payload = { company_id: company.id };

    // Call the API endpoint with the payload and the authorization header
    const response = yield call(
      axios.post,
      GET_JOB_URL,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("✅ Fetch Jobs API Response============?:", response.data.data);
    const jobsData = response.data.data;

    // Dispatch success action with the fetched jobs data
    yield put(fetchJobsSuccess(jobsData));
  } catch (error) {
    console.error("❌ Fetch Jobs Error:", error.message);
    // Dispatch failure action with the error message
    yield put(fetchJobsFailure(error.message));
  }
}


function* updateJobSaga(action) {
  try {
    console.log("🚀 Updating job...", action.payload);
    const jobData = action.payload;
    
    // Retrieve token, user, and company from Redux
    const token = yield select((state) => state.auth.token);
    const user = yield select((state) => state.auth.user);
    let company = yield select((state) => state.companies.company);
    if (!company || !company.id) {
      company = yield call(waitForCompany);
    }
    
    // Build the payload exactly as expected by the API:
    // Note: The API expects the following fields as arrays:
    // - industry
    // - location
    // - skills_required
    // - round
    const payload = {
      id: Number(jobData.id),
      user_id: Number(user?.id),
      company_id: Number(company.id),
      job_title: jobData.title,
      contact_email: jobData.email,
      industry: jobData.industries,          // Must be an array (e.g., ["dsafds"])
      location: jobData.locations,           // Must be an array (e.g., ["pufsf"])
      job_description: jobData.description,
      skills_required: jobData.skills,       // Must be an array (e.g., ["sdfs"])
      status: jobData.status || "Active",
      salary_range: Number(jobData.salary),
      is_hot_job: jobData.hotJob === "yes" ? "Yes" : "No",
      expiration_date: jobData.expirationDate,
      expiration_time: jobData.expirationTime,
      job_type: jobData.employmentType,
      experience_required: jobData.experience,
      responsibilities: jobData.responsibilities,
      round: jobData.selectedInterviewRounds, // Must be an array (e.g., ["1"])
    };

    console.log("🚀 Update Payload:", payload);
    
    // Send the payload as JSON using axios.post. Axios automatically stringifies the payload.
    const response = yield call(
      axios.post,
      `${BASE_URL}/recruiter/update_job_post`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      }
    );
    
    console.log("✅ API Response from update:", response.data);
    const updatedJob = response.data.data;
    yield put(updateJobSuccess(updatedJob));
    // Re-fetch jobs to update the UI
    yield put(fetchJobsRequest());
  } catch (error) {
    console.error("❌ Job Update Error:", error.message);
    yield put(updateJobFailure(error.message));
  }
}

function* deleteJobSaga(action) {
  try {
    // action.payload should have { id, bash_id }
    const { id, bash_id } = action.payload;
    console.log("🚀 Deleting job...", id, bash_id);

    // Retrieve the token from Redux
    const token = yield select((state) => state.auth.token);

    // Build the payload. The API needs job_id and bash_id
    const payload = {
      id: id,
      bash_id: bash_id,
    };

    // Call the delete endpoint
    const response = yield call(
      axios.post,
      `${BASE_URL}/recruiter/delete_job_post`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("✅ Delete Job API Response:", response.data);

    // If successful, dispatch success action
    yield put(deleteJobSuccess({ id, bash_id }));
  } catch (error) {
    console.error("❌ Delete Job Error:", error.message);
    yield put(deleteJobFailure(error.message));
  }
}
export function* watchJobs() {
  yield takeLatest(createJobRequest.type, createJobSaga);
  yield takeLatest(fetchJobsRequest.type, getJobsSaga);
  yield takeLatest(updateJobRequest.type, updateJobSaga);
  yield takeLatest(fetchInterviewRoundsRequest.type, fetchInterviewRoundsSaga);
  yield takeLatest(deleteJobRequest.type, deleteJobSaga); 
  // Other watchers (fetch, delete, update) would be here...
}
