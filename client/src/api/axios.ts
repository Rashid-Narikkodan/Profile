import axios from "axios";
import store from "../app/store";
// Base API URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

// Create a single Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // send cookies if using httpOnly JWT
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT from localStorage (if you are storing access token there)
api.interceptors.request.use(config => {
  const token = store.getState().auth.accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api;
