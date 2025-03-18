
import axios  from 'axios';
import JobSeeker_API_URL from './../../../../../../apiUrls/apiUrls';

// ✅ GET Professional Experience
export const getProfessionalExperienceApi = async (token) => {
    try {
        const response = await axios.get(`${JobSeeker_API_URL}/get_professional_exp`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || "Failed to fetch professional experience!";
    }
};

// ✅ ADD Professional Experience
export const addProfessionalExperienceApi = async (data, token) => {
    try {
        const response = await axios.post(`${JobSeeker_API_URL}/add_professional_exp`, 
            {experiences: data}, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || "Failed to add professional experience!";
    }
};

// ✅ UPDATE Professional Experience
export const updateProfessionalExperienceApi = async (data, token) => {
    try {
        const response = await axios.post(`${JobSeeker_API_URL}/update_professional_exp`, data, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || "Failed to update professional experience!";
    }
};

// ✅ DELETE Professional Experience
export const deleteProfessionalExperienceApi = async (data, token) => {
    try {
        const response = await axios.post(`${JobSeeker_API_URL}/delete_professional_exp`, data, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || "Failed to delete professional experience!";
    }
};