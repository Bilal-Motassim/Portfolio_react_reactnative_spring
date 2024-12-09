import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',  
});

// Add a request interceptor
axiosInstance.interceptors.request.use(config => {

  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  // Do something with request error
  return Promise.reject(error);
});

// Optionally add a response interceptor
axiosInstance.interceptors.response.use(response => {
  // Any status code within the range of 2xx causes this function to trigger
  return response;
}, error => {
  // Any status codes that fall outside the range of 2xx cause this function to trigger
  return Promise.reject(error);
});

export default axiosInstance;
