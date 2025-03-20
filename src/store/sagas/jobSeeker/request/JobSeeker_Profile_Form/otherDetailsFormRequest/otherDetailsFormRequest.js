import axios from "axios";
import JobSeeker_API_URL from "../../../../../../apiUrls/apiUrls";

// ✅ GET Other Details
export const getOtherDetailsApi = async (token) => {
  try {
    const response = await axios.get(`${JobSeeker_API_URL}/get_profile_other_details`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch other details!";
  }
};

// ✅ ADD Other Details
export const addOtherDetailsApi = async (data, token) => {
  try {
    const response = await axios.post(
      `${JobSeeker_API_URL}/profile_other_details`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to add other details!";
  }
};


