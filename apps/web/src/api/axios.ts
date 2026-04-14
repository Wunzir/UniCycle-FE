import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

// Base instance for all API calls
export const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/v1', // Adjust to match your Spring Boot port
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to attach JWT token to protected requests
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('jwt_token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error: AxiosError) => Promise.reject(error));
