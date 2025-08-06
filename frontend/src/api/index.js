import axios from 'axios'

export const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001/api/v1";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        "Content-type": "application/json",
        accept: "application/json",
    },
});

// Set auth token in axios headers
export const setAuthHeaderToken = (token) => {
    if(token) {
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};

export const getStoredToken = () => {
    return localStorage.getItem('authToken');
};


// Request interceptor to automatically add token to requests
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getStoredToken();
        if (token && !config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default axiosInstance;