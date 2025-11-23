// src/api/auth.js
import axiosInstance from "./axiosInstance";

export const register = (data) => axiosInstance.post("/auth/register", data);
export const login = (data) => axiosInstance.post("/auth/login", data);
export const employerLogin = (data) => axiosInstance.post("/auth/employer-login", data);
export const me = () => axiosInstance.get("/auth/me");
