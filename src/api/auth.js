import axios from "axios";

const API_URL = "http://localhost:8081/api/auth";

export const register = async (data) => {
    return axios.post(`${API_URL}/register`, data);
};

export const login = async (data) => {
    return axios.post(`${API_URL}/login`, data);
};

export const getHome = async (token) => {
    return axios.get(`${API_URL}/home`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
