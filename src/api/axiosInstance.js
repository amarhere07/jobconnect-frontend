// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8081/api",
    timeout: 12000,
});

// set token if exists
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    console.log(token, "token")
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, (err) => Promise.reject(err));

axiosInstance.interceptors.response.use(
    (res) => res,
    (err) => {
        // example: if 401 -> clear token and redirect to login
        if (err?.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(err);
    }
);

export default axiosInstance;
