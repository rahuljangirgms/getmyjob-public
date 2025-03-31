import axios from "axios";
import JobSeeker_API_URL from './../../../../../apiUrls/apiUrls';

export const changePasswordApi = async (email, oldpassword, newPassword, token) => {
  const response = await axios.post(
    `${JobSeeker_API_URL}/change_password`,
    {email: email, old_password: oldpassword, new_password: newPassword},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};