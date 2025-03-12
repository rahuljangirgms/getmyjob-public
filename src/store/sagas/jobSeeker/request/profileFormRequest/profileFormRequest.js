import JobSeeker_API_URL from './../../../../../apiUrls/apiUrls';
import axios from 'axios';

// ✅ POST Request - Save Personal Information
export const savePersonalInfoApi = async (formData, token) => {
  try {
      const response = await axios.post(
          `${JobSeeker_API_URL}/personal_info`,
          formData,
          {
              headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
              },    
          }
      );
      return response;
  } catch (error) {
      throw error.response?.data || "Something went wrong!";
  }
};
// ✅ GET Request - Fetch Personal Information
export const getPersonalInfoApi = async (token) => {
    try {
        const response = await axios.get(`${JobSeeker_API_URL}/get_personal_info`, {
            headers: {
                "Authorization": `Bearer ${token}` // Include token
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || "Failed to fetch profile!";
    }
};
