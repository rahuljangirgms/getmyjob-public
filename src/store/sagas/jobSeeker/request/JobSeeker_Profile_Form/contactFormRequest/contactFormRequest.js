import JobSeeker_API_URL from '../../../../../../apiUrls/apiUrls';
import axios  from 'axios';


// POST Request for Saving Conatct Details 

export const saveContactInfoApi = async (formdata, token) =>{
    try {
        const response = await axios.post(`${JobSeeker_API_URL}/contact_details`,
            formdata,
            {
                headers:{
                   "Authorization": `Bearer ${token}`,
                }
            }
        );
        return response;
    } catch (error) {
        throw error.response?.data || "Something went wrong!";
    }
};

// GET Request for Saving Conatct Details 

export const getContactInfoApi = async (token) => {
    try {
        const response = await axios.get(`${JobSeeker_API_URL}/get_contact_details`, {
            headers: {
                "Authorization": `Bearer ${token}` // Include token
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || "Failed to fetch profile!";
    }
};


