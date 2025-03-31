import axios from "axios";
import JobSeeker_API_URL from './../../../../../apiUrls/apiUrls';


// POST Resume (PDF + Data)
export const uploadResumeApi = async ({ resumeName, resumeData, pdfBlob, token }) => {
  const formData = new FormData();

  // Wrap Blob as File to include filename
  const pdfFile = new File([pdfBlob], `${resumeName}.pdf`, { type: "application/pdf" });

  formData.append("resume_name", resumeName);
  formData.append("resume_json", JSON.stringify(resumeData));
  formData.append("resume", pdfFile); // ✅ actual file

  const response = await axios.post(`${JobSeeker_API_URL}/generate_resume`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};


// GET All Resumes
export const getResumesApi = async (token) => {
  const response = await axios.get(`${JobSeeker_API_URL}/view_generate_resume`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// POST to Delete All resumes

export const deleteResumeApi = async (id, token) =>{
  const response = await axios.post(`${JobSeeker_API_URL}/delete_generate_resume`, 
    {id: id}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


