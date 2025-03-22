import JobSeeker_API_URL from '../../../../../../apiUrls/apiUrls';
import axios  from 'axios';


// POST Request for Saving Education Details 

export const saveEducationInfoApi = async (data, type, token) => {
  console.log("Education data to post:", data);
  try {
    const response = await axios.post(`${JobSeeker_API_URL}/add_education`, 
      { educations: { type, data } }, 
      { headers: { "Authorization": `Bearer ${token}` } }
    );

    return response;
  } catch (error) {
    console.error("POST API Error:", error.response?.data);
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
        return response;
    } catch (error) {
        throw error.response?.data || "Failed to fetch Education Data!";
    }
};

// POST Request to Update Education Details

export const updateEducationApi = async (id,data,token ) =>{

  console.log("Education data to Update: ",id," ",data)
  try {
    const response = await axios.post(`${JobSeeker_API_URL}/update_education`,
      {education_id: id, educations: data},
      {
        headers:{
          "Authorization": `Bearer ${token}`,
        }
      }
    );
    return response;
  } catch (error) { 
    throw error.response?.data || "Failed to Update Education Data!";
  }
}


// POST Request to Delete Education Details 

export const deleteEducationApi = async (id,token) =>{

  try {
    const response = await axios.post(`${JobSeeker_API_URL}/delete_education`,
      {education_id: id},
      {
        headers:{
          "Authorization": `Bearer ${token}`,
        }
      }
    );
    return response;
  } catch (error) {
    throw error.response?.data || "Failed to Delete Education Data!";

  }

}
