import axios from "axios";
import JobSeeker_API_URL from './../../../../../apiUrls/apiUrls';


// ✅ GET request to check if the profile is complete
export const checkProfileCompleteApi = async (token) => {
  try {
    const response = await axios.get(`${JobSeeker_API_URL}/check_profile_complete`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    return response.data; // ✅ Return API response
  } catch (error) {
    throw error.response?.data || "Failed to check profile completion!";
  }
};
