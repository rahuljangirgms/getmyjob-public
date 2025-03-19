import axios from "axios";
import JobSeeker_API_URL from "../../../../../../apiUrls/apiUrls";

// ✅ GET Project Experience
export const getProjectExperienceApi = async (token) => {
  try {
    const response = await axios.get(`${JobSeeker_API_URL}/get_project`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch project experience!";
  }
};

// ✅ ADD Project Experience
export const addProjectExperienceApi = async (data, token) => {
  try {
    const response = await axios.post(
      `${JobSeeker_API_URL}/add_project`,
      { projects: data },
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to add project experience!";
  }
};

// ✅ UPDATE Project Experience
export const updateProjectExperienceApi = async (id, data, token) => {
  try {
    const response = await axios.post(
      `${JobSeeker_API_URL}/update_project`,
      { project_id: id, projects: data },
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to update project experience!";
  }
};

// ✅ DELETE Project Experience
export const deleteProjectExperienceApi = async (id, token) => {
  try {
    const response = await axios.post(
      `${JobSeeker_API_URL}/delete_project`,
      { project_id: id },
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to delete project experience!";
  }
};
