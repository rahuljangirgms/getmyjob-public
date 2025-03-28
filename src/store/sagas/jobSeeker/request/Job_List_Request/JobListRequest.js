import axios from "axios";
import JobSeeker_API_URL from "./../../../../../apiUrls/apiUrls";

// POST request for Job List

export const getJobListApi = async (token) => {
  const response = await axios.post(
    `${JobSeeker_API_URL}/job_list`,
    {}, // if you don't have a body to send
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// POST request for Job Detail Page

export const getJobDetailsApi = async (id,bash_id,token) => {
  const response = await axios.post(
    `${JobSeeker_API_URL}/get_job_details`,
    {id: id, bash_id: bash_id}, // if you don't have a body to send
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// POST request for Get Job Rounds

export const getJobRoundsApi = async (id,bash_id,token) => {
  const response = await axios.post(
    `${JobSeeker_API_URL}/get_job_round`,
    {id: id, bash_id: bash_id},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};