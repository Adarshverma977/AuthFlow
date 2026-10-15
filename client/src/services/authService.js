import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const authApi = axios.create({
  baseURL: `${API_URL}/auth`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function registerUser(userData) {
  const response = await authApi.post("/register", userData);
  return response.data;
}

export async function loginUser(credentials) {
  const response = await authApi.post("/login", credentials);
  return response.data;
}

export async function logoutUser() {
  const response = await authApi.post("/logout");
  return response.data;
}

export async function getCurrentUser() {
  const response = await authApi.get("/me");
  return response.data;
}

export default authApi;
