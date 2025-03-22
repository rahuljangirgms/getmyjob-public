import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL, // Use environment variable
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor - Attach Auth Token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor - Handle Errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response || error.message);
        return Promise.reject(error);
    }
);

export default apiClient;
