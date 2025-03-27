import axios from "axios";
import JobSeeker_API_URL from "./../../../../../apiUrls/apiUrls";

export const applyJobApi = async (bash_id, id, resume_id, token) => {
  const response = await axios.post(
    `${JobSeeker_API_URL}/apply_job`,
    { id: id, bash_id: bash_id, resume_id: resume_id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
