// Arquivo: src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7107/api'
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('user_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;