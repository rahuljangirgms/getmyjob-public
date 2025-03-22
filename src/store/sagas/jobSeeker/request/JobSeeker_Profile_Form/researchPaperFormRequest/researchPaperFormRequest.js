import axios from "axios";
import JobSeeker_API_URL from "../../../../../../apiUrls/apiUrls";

// ✅ GET Research Papers
export const getResearchPaperApi = async (token) => {
  try {
    const response = await axios.get(`${JobSeeker_API_URL}/get_research_paper`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch research papers!";
  }
};

// ✅ ADD Research Paper
export const addResearchPaperApi = async (data, token) => {
  try {
    const response = await axios.post(
      `${JobSeeker_API_URL}/add_research_paper`,
      { publications: data },
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to add research paper!";
  }
};

// ✅ UPDATE Research Paper
export const updateResearchPaperApi = async (id, data, token) => {

  console.log("Publication To Update : ", id, " ,  ", data);

  try {
    const response = await axios.post(
      `${JobSeeker_API_URL}/update_research_paper`,
      { publication_id: id, publications: data },
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to update research paper!";
  }
};

// ✅ DELETE Research Paper
export const deleteResearchPaperApi = async (id, token) => {
  try {
    const response = await axios.post(
      `${JobSeeker_API_URL}/delete_research_paper`,
      { publication_id: id },
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) { 
    throw error.response?.data || "Failed to delete research paper!";
  }
};
