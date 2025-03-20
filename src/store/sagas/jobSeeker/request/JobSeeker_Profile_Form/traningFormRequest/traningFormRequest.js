import axios from "axios";
import JobSeeker_API_URL from "../../../../../../apiUrls/apiUrls";

// ✅ GET Training
export const getTrainingApi = async (token) => {
  try {
    const response = await axios.get(`${JobSeeker_API_URL}/get_training`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch training!";
  }
};

// ✅ ADD Training
export const addTrainingApi = async (data, token) => {
  try {
    const response = await axios.post(
      `${JobSeeker_API_URL}/add_training`,
      { trainings: data },
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to add training!";
  }
};

// ✅ UPDATE Training
export const updateTrainingApi = async (id, data, token) => {
  try {
    const response = await axios.post(
      `${JobSeeker_API_URL}/update_training`,
      { training_id: id, trainings: data },
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to update training!";
  }
};

// ✅ DELETE Training
export const deleteTrainingApi = async (id, token) => {
  try {
    const response = await axios.post(
      `${JobSeeker_API_URL}/delete_training`,
      { training_id: id },
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to delete training!";
  }
};
