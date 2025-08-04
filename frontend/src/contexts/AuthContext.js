import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from "../api/auth";
import { setAuthHeaderToken } from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for existing token on app start
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('authUser');

        if(storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));

            // Set axios default header for authenticated requests
            setAuthHeaderToken(storedToken);
        }

        setLoading(false);
    }, []);

    const setUserData = (result) => {
        if(result.success) {
            const { _id, name, email, token } = result.data;

            // store user data and token
            const userData = { _id, name, email };
            setUser(userData);
            setToken(token);
            localStorage.setItem('authToken', token);
            localStorage.setItem('authUser', JSON.stringify(userData));

            setAuthHeaderToken(token);
        }
    }

    const login = async (email, password) => {
        const result = await loginUser(email, password);

        setUserData(result);
        return result;
    };

    const register = async (name, email, password) => {
        const result = await registerUser(name, email, password);

        setUserData(result);
        return result;
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        setAuthHeaderToken(null);
    };

    const isAuthenticated = () => {
        return !!user && !!token;
    }

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};