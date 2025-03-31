// candidateSaga.js
import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchCandidatesRequest,
  fetchCandidatesSuccess,
  fetchCandidatesFailure,
  updateCandidateInvitationRequest,
  updateCandidateInvitationSuccess,
  updateCandidateInvitationFailure,
  applyForJobRequest,
  applyForJobSuccess,
  applyForJobFailure,
  fetchCandidateTestsRequest,   // NEW
  fetchCandidateTestsSuccess,   // NEW
  fetchCandidateTestsFailure,
  fetchOpentoworkCandidatesRequest,   // NEW
} from "../../slices/recruiter/candidateSlice";

const BASE_URL = "https://recruitment.getmysolutions.in/api/v1";

// ----------------------------
// Worker Saga: Fetch Candidates
// ----------------------------
function* fetchCandidatesSaga(action) {
  try {
    const token = yield select((state) => state.auth.token);
    // Destructure values from the action payload
    let { job_id, bash_id } = action.payload || {};

    // If job_id or bash_id are missing in the payload, try getting them from the jobs slice
    if (!job_id || !bash_id) {
      const jobState = yield select((state) => state.jobs);
      // Adjust these property names as per your Redux jobs state structure.
      job_id = job_id || jobState.selectedJobId;
      bash_id = bash_id || jobState.selectedBashId;
    }

    const url = `${BASE_URL}/job_applicant`;
    console.log("Fetching candidates from URL:", url, "with job_id:", job_id, "and bash_id:", bash_id);

    // Send job_id and bash_id in the request body
    const response = yield call(
      axios.post,
      url,
      { job_id, bash_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Log the API response data
    console.log("API response===================>:", response.data);

    const candidateData = response.data.data|| [];

    // // If job_id is provided, do additional filtering
    // if (job_id) {
    //   const jobResponse = yield call(axios.get, `${BASE_URL}/jobManagement`);
    //   const jobManagement = jobResponse.data;
    //   const job = jobManagement.activeJobs.find(
    //     (jobItem) => jobItem.id === parseInt(job_id, 10)
    //   );
    //   if (job && job.skills && job.skills.length > 0) {
    //     candidateData = candidateData.filter((candidate) =>
    //       candidate.skills?.some((skill) => job.skills.includes(skill))
    //     );
    //   }
    // }

    yield put(fetchCandidatesSuccess(candidateData));
  } catch (error) {
    console.error("Error in fetchCandidatesSaga:", error.message);
    yield put(fetchCandidatesFailure(error.message));
  }
}

function* fetchOpentoworkCandidatesSaga(action) {
  try {
    const token = yield select((state) => state.auth.token);
    // Destructure values from the action payload
    let { job_id, bash_id } = action.payload || {};

    // If job_id or bash_id are missing in the payload, try getting them from the jobs slice
    if (!job_id || !bash_id) {
      const jobState = yield select((state) => state.jobs);
      // Adjust these property names as per your Redux jobs state structure.
      job_id = job_id || jobState.selectedJobId;
      bash_id = bash_id || jobState.selectedBashId;
    }

    const url = `${BASE_URL}/open_to_work`;
    console.log("Fetching candidates from URL:", url, "with job_id:", job_id, "and bash_id:", bash_id);

    // Send job_id and bash_id in the request body
    const response = yield call(
      axios.post,
      url,
      { job_id, bash_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Log the API response data
    console.log("API response===================fgfghfhfghf>:", response.data);

    const candidateData = response.data.data|| [];

    // // If job_id is provided, do additional filtering
    // if (job_id) {
    //   const jobResponse = yield call(axios.get, `${BASE_URL}/jobManagement`);
    //   const jobManagement = jobResponse.data;
    //   const job = jobManagement.activeJobs.find(
    //     (jobItem) => jobItem.id === parseInt(job_id, 10)
    //   );
    //   if (job && job.skills && job.skills.length > 0) {
    //     candidateData = candidateData.filter((candidate) =>
    //       candidate.skills?.some((skill) => job.skills.includes(skill))
    //     );
    //   }
    // }

    yield put(fetchCandidatesSuccess(candidateData));
  } catch (error) {
    console.error("Error in fetchCandidatesSaga:", error.message);
    yield put(fetchCandidatesFailure(error.message));
  }
}

// ----------------------------
// Worker Saga: Fetch Candidate Tests (NEW)
// ----------------------------
function* fetchCandidateTestsSaga(action) {
  try {
    const { candidateId, jobId } = action.payload;
    const response = yield call(
      axios.get,
      `${BASE_URL}/candidateTests?candidateId=${candidateId}&jobId=${jobId}`
    );
    yield put(fetchCandidateTestsSuccess(response.data));
  } catch (error) {
    console.error("Error in fetchCandidateTestsSaga:", error.message);
    yield put(fetchCandidateTestsFailure(error.message));
  }
}

// ----------------------------
// Worker Saga: Update Candidate Invitation (and apply for job)
// ----------------------------
function* updateCandidateInvitationSaga(action) {
  try {
    const { id, jobinvitation, jobId, interviewScore, roundsLeft, interviewRounds } = action.payload;
    const candidateRes = yield call(axios.get, `${BASE_URL}/candidates/${id}`);
    let candidate = candidateRes.data;
    candidate.jobinvitation = jobinvitation;
    const updatedCandidate = {
      ...candidate,
      jobinvitation,
      interviewScore: interviewScore !== undefined ? interviewScore : candidate.interviewScore,
      roundsLeft: roundsLeft !== undefined ? roundsLeft : candidate.roundsLeft,
      interviewRounds: interviewRounds !== undefined ? interviewRounds : candidate.interviewRounds,
      appliedJobs: candidate.appliedJobs ? [...candidate.appliedJobs] : [],
    };
    if (jobId) {
      const numericJobId = parseInt(jobId, 10);
      if (!updatedCandidate.appliedJobs.includes(numericJobId)) {
        updatedCandidate.appliedJobs.push(numericJobId);
      }
    }
    const response = yield call(axios.patch, `${BASE_URL}/candidates/${id}`, {
      jobinvitation: updatedCandidate.jobinvitation,
      appliedJobs: updatedCandidate.appliedJobs,
      interviewScore: updatedCandidate.interviewScore,
      roundsLeft: updatedCandidate.roundsLeft,
      interviewRounds: updatedCandidate.interviewRounds,
    });
    console.log("Updated candidate invitation:", response.data);
    yield put(updateCandidateInvitationSuccess(response.data));
  } catch (error) {
    console.error("Error updating candidate invitation:", error.message);
    yield put(updateCandidateInvitationFailure(error.message));
  }
}

// ----------------------------
// Worker Saga: Apply For Job (create test session)
// ----------------------------
function* applyForJobSaga(action) {
  try {
    const { candidateId, jobId } = action.payload;
    // 1) Update candidate: add jobId to appliedJobs if not already present
    const candidateRes = yield call(axios.get, `${BASE_URL}/candidates/${candidateId}`);
    const candidate = candidateRes.data;
    const updatedAppliedJobs = candidate.appliedJobs ? [...candidate.appliedJobs] : [];
    if (!updatedAppliedJobs.includes(jobId)) {
      updatedAppliedJobs.push(jobId);
      yield call(axios.patch, `${BASE_URL}/candidates/${candidateId}`, { appliedJobs: updatedAppliedJobs });
    }
    // 2) Fetch the job details (to get autoGeneratedQuestions)
    const jobRes = yield call(axios.get, `${BASE_URL}/jobManagement/activeJobs/${jobId}`);
    const job = jobRes.data;
    // 3) Create a new test session for the candidate
    const testSession = {
      candidateId,
      jobId,
      questions: (job.autoGeneratedQuestions || []).map((qid) => ({
        questionId: qid,
        answer: "",
        score: 0,
      })),
      status: "Not Started",
      totalScore: 0,
    };
    yield call(axios.post, `${BASE_URL}/candidateTests`, testSession);
    yield put(applyForJobSuccess({ candidateId, jobId }));
  } catch (error) {
    console.error("Error in applyForJobSaga:", error.message);
    yield put(applyForJobFailure(error.message));
  }
}

export function* watchCandidates() {
  yield takeLatest(fetchCandidatesRequest.type, fetchCandidatesSaga);
  yield takeLatest(fetchOpentoworkCandidatesRequest.type, fetchOpentoworkCandidatesSaga );
  yield takeLatest(fetchCandidateTestsRequest.type, fetchCandidateTestsSaga); // NEW
  yield takeLatest(updateCandidateInvitationRequest.type, updateCandidateInvitationSaga);
  yield takeLatest(applyForJobRequest.type, applyForJobSaga);
}
