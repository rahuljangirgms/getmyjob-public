import apiClient from '../api/apiClient';

// Login API Request
export const login = async (email, password) => {
    try {
        const response = await apiClient.post('admin/login', { email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Forgot Password API Request
export const forgotPassword = async (email) => {
    try {
        const response = await apiClient.post('admin/forgot_password', { email });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Reset Password API Request
export const resetPassword = async (token, newPassword) => {
    try {
        const response = await apiClient.post('admin/reset_password', { token, password: newPassword });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
