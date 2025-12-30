import axios from "axios";

const BASE_URL = "https://localhost:5136/api/LeaveRequest";

export const applyLeave = (data) => axios.post(`${BASE_URL}/apply`, data);

export const updateLeave = (data) => axios.post(`${BASE_URL}/update`, data);

export const getLeaveByUserId = (id) => axios.get(`${BASE_URL}/${id}`);

export const getAllLeaves = () => axios.get(`${BASE_URL}/all`);

export const getLeaveByStatus = (status) =>
  axios.get(`${BASE_URL}/bystatus/${status}`);

export const getLeaveByDepartment = (departmentId) =>
  axios.get(`${BASE_URL}/bydepartment/${departmentId}`);

export const cancelLeave = (id) => {
  return axios.delete(`${BASE_URL}/Delete/${id}`);
};

export const getLeaveByDateRange = (fromDate, toDate) =>
  axios.post(`${BASE_URL}/filter-by-date`, {
    fromDate,
    toDate,
  });
