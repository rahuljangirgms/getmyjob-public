// src/store/sagas/recruiter/companySaga.js
import { call, put, takeLatest, select } from "redux-saga/effects";
import axios from "axios";
import {
  fetchCompanyRequest,
  fetchCompanySuccess,
  fetchCompanyFailure,
  updateCompanyRequest,
  updateCompanySuccess,
  updateCompanyFailure,
} from "../../slices/recruiter/companySlice";

const BASE_URL = "https://recruitment.getmysolutions.in/api/v1";

// 1) Fetch Company Profile
function* fetchCompanySaga() {
  try {
    console.log("🚀 Fetching Company Profile...");
    const token = yield select((state) => state.auth.token);
    let user = yield select((state) => state.auth.user);

    // Fallback to localStorage if user is not in Redux
    if (!user) {
      const storedAuth = localStorage.getItem("auth");
      if (storedAuth) {
        user = JSON.parse(storedAuth).user;
      }
    }

    if (!user || !user.id) {
      throw new Error("User not authenticated or user ID is missing");
    }

    // Make the request
    const response = yield call(
      axios.post,
      `${BASE_URL}/company_profile`,
      { user_id: user.id },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    let companyData = response.data.data;
    console.log("✅ API Response Data:", companyData);

    // Parse industry and locations if they are JSON strings
    if (companyData) {
      if (companyData.industry && typeof companyData.industry === "string") {
        try {
          companyData.industry = JSON.parse(companyData.industry);
        } catch (e) {
          console.warn("Failed to parse industry:", e);
          companyData.industry = [];
        }
      }
      if (companyData.locations && typeof companyData.locations === "string") {
        try {
          companyData.locations = JSON.parse(companyData.locations);
        } catch (e) {
          console.warn("Failed to parse locations:", e);
          companyData.locations = [];
        }
      }
      // Parse social_profiles if they come as a JSON string
      if (
        companyData.social_profiles &&
        typeof companyData.social_profiles === "string"
      ) {
        try {
          companyData.social_profiles = JSON.parse(companyData.social_profiles);
        } catch (e) {
          console.warn("Failed to parse social_profiles:", e);
          companyData.social_profiles = [];
        }
      }
    }

    yield put(fetchCompanySuccess(companyData));
  } catch (error) {
    console.error("❌ API Fetch Error:", error.message);
    yield put(fetchCompanyFailure(error.message));
  }
}

// 2) Update Company Profile
function* updateCompanySaga(action) {
  try {
    console.log("🚀 Updating Company Profile...");
    const token = yield select((state) => state.auth.token);
    let user = yield select((state) => state.auth.user);

    if (!user || !user.id) {
      throw new Error("User not authenticated or user ID is missing");
    }

    // Build the FormData
    const formData = new FormData();
    formData.append("user_id", user.id);

    // Extract arrays and social_profiles separately
    const { industry, locations, social_profiles, ...rest } = action.payload;

    // Append industry array items
    if (Array.isArray(industry)) {
      industry.forEach((item) => {
        formData.append("industry[]", item);
      });
    }

    // Append locations array items
    if (Array.isArray(locations)) {
      locations.forEach((loc) => {
        formData.append("locations[]", loc);
      });
    }

    // Append social_profiles as an array, similar to industry/locations
    if (Array.isArray(social_profiles)) {
      social_profiles.forEach((profile) => {
        formData.append("social_profiles[]", profile);
      });
    }

    // Append all remaining fields
    for (const key in rest) {
      if (rest[key] !== undefined && rest[key] !== null) {
        formData.append(key, rest[key]);
      }
    }

    // Make the request with multipart/form-data
    const response = yield call(
      axios.post,
      `${BASE_URL}/update_company_profile`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("✅ Company Updated:", response.data);

    // Re-fetch the updated company data if the update was successful
    if (response.data.status) {
      yield put(fetchCompanyRequest({ user_id: user.id }));
    }
  } catch (error) {
    console.error("❌ Update Company Error:", error.message);
    yield put(updateCompanyFailure(error.message));
  }
}

export function* watchCompany() {
  yield takeLatest(fetchCompanyRequest.type, fetchCompanySaga);
  yield takeLatest(updateCompanyRequest.type, updateCompanySaga);
}
