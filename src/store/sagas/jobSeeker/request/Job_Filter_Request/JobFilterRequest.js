import axios from "axios";
import JobSeeker_API_URL from "./../../../../../apiUrls/apiUrls";

export const filterJobsApi = async (
  jobType,
  salary,
  workLocation,
  job_title,
  token
) => {
  const response = await axios.post(
    `${JobSeeker_API_URL}/job_list_filter`,
    {
      job_type: jobType,
      salary: salary,
      location: workLocation,
      job_title: job_title,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
