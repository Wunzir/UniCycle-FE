export const SHARED_TEXT = "Hello from the Shared Library (TypeScript)!";

export interface User {
    id: string;
    username: string;
    email: string;
    role: 'student' | 'admin';
}