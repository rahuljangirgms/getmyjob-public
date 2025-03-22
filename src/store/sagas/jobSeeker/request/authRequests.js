import axios from 'axios';

import  JobSeeker_API_URL from './../../../../apiUrls/apiUrls';



export const loginApi = (credentials) => axios.post(`${JobSeeker_API_URL}/login`, credentials);

export const registerApi = (userData) => axios.post(`${JobSeeker_API_URL}/register`, userData);

export const forgetPassApi = (email) => axios.post(`${JobSeeker_API_URL}/forgot_password`,email);

export const resetPassApi = (data) => axios.post(`${JobSeeker_API_URL}/reset_password`,data); 
