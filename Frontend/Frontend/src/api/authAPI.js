import axios from "axios";

const BASE_URL = "https://localhost:5136/api/Auth";

export const loginApi = (data) => axios.post(`${BASE_URL}/login`, data);

export const registerApi = (data) => axios.post(`${BASE_URL}/register`, data);


export const forgotPasswordApi = (data) =>
  axios.post(`${BASE_URL}/forgot-password`, data);

export const resetPasswordApi = (data) =>
  axios.post(`${BASE_URL}/reset-password`, data);  