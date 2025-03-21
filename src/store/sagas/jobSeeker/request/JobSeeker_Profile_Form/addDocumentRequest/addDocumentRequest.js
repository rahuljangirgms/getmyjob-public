import axios from "axios";
import JobSeeker_API_URL from "./../../../../../../apiUrls/apiUrls";

export const uploadAttachmentApi = async ({ file, type }, token) => {
  try {
    const formData = new FormData();
    formData.append("documents[file]", file);
    formData.append("documents[type]", type);

    const response = await axios.post(
      `${JobSeeker_API_URL}/add_document`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Upload Error:", error.response?.data);
    throw error.response?.data || "Upload failed!";
  }
};

export const getDocumentsApi = async (token) => {
  try {
    const response = await axios.get(`${JobSeeker_API_URL}/get_document`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch documents";
  }
};


export const deleteDocumentApi = async (id, token) =>{

  console.log("Document Id to delete:",id);
  try {
    const response = await axios.post(`${JobSeeker_API_URL}/delete_document`,
      {doc_id: id},
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to Delete documents";
  }
}
