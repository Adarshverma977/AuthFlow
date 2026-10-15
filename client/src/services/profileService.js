import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const userApi = axios.create({
  baseURL: `${API_URL}/users`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getProfile() {
  const response = await userApi.get("/profile");
  return response.data;
}

export async function updateProfile(profileData) {
  const response = await userApi.patch("/profile", profileData);
  return response.data;
}
