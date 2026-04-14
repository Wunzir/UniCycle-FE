import { apiClient } from './axios';

// Matching your Kotlin SignupRequest data class
export interface SignupRequest {
    email:      string;
    password:   string;
    firstName:  string;
    lastName:   string;
    university: string;
}

// Matching your Kotlin LoginRequest data class
export interface LoginRequest {
    email:    string;
    password: string;
}

export const authApi = {
    login: async (credentials: LoginRequest) => {
        const response = await apiClient.post('/auth/login', credentials);
        return response.data; // Expecting LoginResponse from backend
    },

    signup: async (userData: SignupRequest) => {
        const response = await apiClient.post('/auth/signup', userData);
        return response.data; // Expecting UserDto.Readonly
    }
};