import axios from "axios";

const BASE_URL = "https://localhost:5136/api/Department";

export const getAllDepartments = async () => await axios.get(`${BASE_URL}`);

export const getDepartmentById = async (departmentId) =>
  await axios.get(`${BASE_URL}/${departmentId}`);

export const createDepartment = async (data) =>
  await axios.post(`${BASE_URL}`, data);

export const updateDepartment = async (departmentId, data) =>
  await axios.post(`${BASE_URL}/update/${departmentId}`, data);

export const deleteDepartment = async (departmentId) =>
  await axios.delete(`${BASE_URL}/delete/${departmentId}`);

// export const deleteDepartment = async (id) => {
//     try {
//         const response = await axios.delete(`${BASE_URL}/DeleteDepartment/${id}`);
//         return response.data;
//     } catch (error) {
//         console.error("Error deleting department:", error);
//         throw error;
//     }
// };
