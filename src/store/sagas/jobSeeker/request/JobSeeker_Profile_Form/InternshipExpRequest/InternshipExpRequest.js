
import axios  from 'axios';
import JobSeeker_API_URL from './../../../../../../apiUrls/apiUrls';

// ✅ GET Professional Experience
export const getInternshipExperienceApi = async (token) => {
    try {
        const response = await axios.get(`${JobSeeker_API_URL}/get_internship`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || "Failed to fetch internship experience!";
    }
};

// ✅ ADD Professional Experience
export const addInternshipExperienceApi = async (data, token) => {

    console.log("Experience to post: ", data);

    try {
        const response = await axios.post(`${JobSeeker_API_URL}/add_internship`, 
            {internships: data}, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || "Failed to add internship experience!";
    }
};

// ✅ UPDATE Professional Experience
export const updateInternshipExperienceApi = async (id, data, token) => {


  
    try {
        const response = await axios.post(`${JobSeeker_API_URL}/update_internship`, 
            {internship_id: id, internships: data}, 
            {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || "Failed to update internship experience!";
    }
};

// ✅ DELETE Professional Experience
export const deleteInternshipExperienceApi = async (data, token) => {
    try {
        const response = await axios.post(`${JobSeeker_API_URL}/delete_internship`,
             {internship_id: data}, 
        {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || "Failed to delete internship experience!";
    }
};