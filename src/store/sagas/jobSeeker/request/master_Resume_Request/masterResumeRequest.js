import axios from "axios";
import JobSeeker_API_URL from './../../../../../apiUrls/apiUrls';


// ✅ GET Master Resume
export const getMasterResumeApi = async (token) => {
  try {
    const response = await axios.get(`${JobSeeker_API_URL}/master_resume_json`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch master resume!";
  }
};
