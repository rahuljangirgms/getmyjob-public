import axios from "axios";
import JobSeeker_API_URL from "./../../../../../apiUrls/apiUrls";

// POST request for get resume data by Id

export const getResumeByIdApi = async (id, bash_id, token) => {
  const response = await axios.post(
    `${JobSeeker_API_URL}/get_resume_by_id`,
    { id: id, bash_id: bash_id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data; 
};


export const getResumeAnalysisApi = async (id, bash_id, token ) => {
  const response = await axios.post(
    `${JobSeeker_API_URL}/submit_ai_resume_analysis`,
    {id: id, bash_id: bash_id}, // ✅ Pass the actual JSON object here
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
