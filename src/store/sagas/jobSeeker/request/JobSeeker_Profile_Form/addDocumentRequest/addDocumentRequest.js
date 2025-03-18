import JobSeeker_API_URL from './../../../../../../apiUrls/apiUrls';
import  axios  from 'axios';

// POST request for Saving Documents

export const addDocumentsApi = async (documents, token) => {
    try {
        const formData = new FormData();

        // ✅ Append each document correctly
        documents.forEach((doc, index) => {
            if (doc.file instanceof File) {  // ✅ Ensure file is valid
                formData.append(`document_${index}`, doc.file);
                formData.append(`type_${index}`, doc.type);
            } else {
                console.error("Invalid file format:", doc.file);
            }
        });

        console.log("Final FormData:", formData);

        const response = await axios.post(`${JobSeeker_API_URL}/add_document`, formData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        return response;
    } catch (error) {
        throw error.response?.data || "Something went wrong while adding the document!";
    }
};

// GET request to get Saved Documents

export const getDocumentsApi = async (token) => {
    try {
        const response = await axios.get(`${JobSeeker_API_URL}/get_document`, {
            headers: {
                "Authorization": `Bearer ${token}` // Include token
            },
        });
        return response;
    } catch (error) {
        throw error.response?.data || "Failed to fetch Documents Data!";
    }
};