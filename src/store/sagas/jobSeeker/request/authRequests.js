import axios from 'axios';

import  JobSeeker_API_URL from './../../../../apiUrls/apiUrls';



export const loginApi = (credentials) => axios.post(`${JobSeeker_API_URL}/login`, credentials);
export const registerApi = (userData) => axios.post(`${JobSeeker_API_URL}/register`, userData);
