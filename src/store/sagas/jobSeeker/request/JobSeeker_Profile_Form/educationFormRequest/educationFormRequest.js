import JobSeeker_API_URL from '../../../../../../apiUrls/apiUrls';
import axios  from 'axios';


// POST Request for Saving Education Details 

export const saveEducationInfoApi = async (data, type, token) => {
    console.log("Education data to post: ", data);
    try {
      const response = await axios.post(
        `${JobSeeker_API_URL}/add_education`,
        { educations: { type, data } }, // payload wrapped inside "educations" 
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error.response?.data || "Something went wrong!";
    }
  };
  
// GET Request for Saving Education Details 

export const getEducationInfoApi = async (token) => {
    try {
        const response = await axios.get(`${JobSeeker_API_URL}/get_education`, {
            headers: {
                "Authorization": `Bearer ${token}` // Include token
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || "Failed to fetch profile!";
    }
};


