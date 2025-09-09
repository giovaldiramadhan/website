import React, { useContext, useState } from 'react';
import axios from 'axios';
// Hapus 'useNavigate' dari impor ini karena tidak digunakan di file ini
// import { useNavigate } from 'react-router-dom'; 

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const API_URL = 'http://localhost:5000/api/auth';

    const registerUser = async (userData) => {
        setIsLoading(true);
        try {
            await axios.post(`${API_URL}/register`, userData);
            return { success: true };
        } catch (error) {
            console.error('Registration error:', error.response?.data?.message || error.message);
            return { success: false, message: error.response?.data?.message || 'Registration failed' };
        } finally {
            setIsLoading(false);
        }
    };

    const loginUser = async (userData) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_URL}/login`, userData);
            const { user, token } = response.data;
            setUser({ ...user, token });
            return { success: true };
        } catch (error) {
            console.error('Login error:', error.response?.data?.message || error.message);
            return { success: false, message: error.response?.data?.message || 'Invalid credentials' };
        } finally {
            setIsLoading(false);
        }
    };

    const logoutUser = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, isLoading, registerUser, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};