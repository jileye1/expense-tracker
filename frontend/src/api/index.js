import axios from 'axios'

export const BASE_URL = process.env.SERVER_URL || "http://localhost:3000/api/v1";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        "Content-type": "application/json",
        accept: "application/json",
    },
});

export default axiosInstance;