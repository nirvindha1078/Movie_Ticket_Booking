import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7128/api',  
  headers: {
   'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const post = (url: string, data: unknown) => {
  return api.post(url, data);
};

export default api;
