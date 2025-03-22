import axios from "axios";
import JobSeeker_API_URL from "../../../../../../apiUrls/apiUrls";

// ✅ GET Certification
export const getCertificationApi = async (token) => {
  try {
    const response = await axios.get(`${JobSeeker_API_URL}/get_certification`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch certification!";
  }
};

// ✅ ADD Certification
export const addCertificationApi = async (data, token) => {
  try {
    const response = await axios.post(
      `${JobSeeker_API_URL}/add_certification`,
      { certifications: data },
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to add certification!";
  }
};

// ✅ UPDATE Certification
export const updateCertificationApi = async (id, data, token) => {
  try {
    const response = await axios.post(
      `${JobSeeker_API_URL}/update_certification`,
      { certification_id: id, certifications: data },
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to update certification!";
  }
};

// ✅ DELETE Certification
export const deleteCertificationApi = async (id, token) => {
  try {
    const response = await axios.post(
      `${JobSeeker_API_URL}/delete_certification`,
      { certification_id: id },
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to delete certification!";
  }
};
