import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_API_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

const NON_TOKEN_URL_LIST = ['/login', '/signup'];

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      if (!NON_TOKEN_URL_LIST.includes(config.url as string)) {
        config.headers.Authorization = token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
