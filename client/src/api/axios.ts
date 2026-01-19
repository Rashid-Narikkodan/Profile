import axios from "axios";

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
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: global response interceptor for handling 401
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      // e.g., redirect to login or refresh token logic
      console.warn("Unauthorized - token may be expired");
    }
    return Promise.reject(error);
  }
);

export default api;
