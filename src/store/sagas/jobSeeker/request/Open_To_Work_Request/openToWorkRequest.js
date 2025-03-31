import axios from "axios";
import JobSeeker_API_URL from "./../../../../../apiUrls/apiUrls";


export const getOpenToWorkApi = async (token) => {
  try {
    const response = await axios.get(
      `${JobSeeker_API_URL}/get_open_to_work`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("get Open to Work:", error.response?.data);
    throw error.response?.data || "get Open to Work failed!";
  }
};

export const setOpenToWorkApi = async (data, token) => {
  try {
    const response = await axios.post(
      `${JobSeeker_API_URL}/open_to_work`,
      { open_to_work: data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Set Open to Work:", error.response?.data);
    throw error.response?.data || "Set Open to Work failed!";
  }
};
