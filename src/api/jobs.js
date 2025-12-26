// src/api/jobs.js
import axios from "axios";
import axiosInstance from "./axiosInstance";

export const getAllJobs = (params = {}) =>
    axiosInstance.get("/jobs/all", { params }); // support query params for server side filter

export const getJob = (id) => axiosInstance.get(`/jobs/${id}`);

export const createJob = (payload) => axiosInstance.post("/jobs/create-job", payload);

export const applyJob = (jobId, payload) =>
    axiosInstance.post(`/jobs/${jobId}/apply`, payload);

export const applyJobHandle = (jobId) =>
    axiosInstance.post(`/applications/apply/${jobId}`);

export const toggleSaveJob = (jobId) =>
    axiosInstance.post(`/jobs/${jobId}/save`);

export const getEmployerJobs = () =>
    axiosInstance.get("/jobs/employer/all"); 
