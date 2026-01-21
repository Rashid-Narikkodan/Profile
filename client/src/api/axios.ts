import axios from "axios";
// Base API URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

//get access token from store
let accessToken: string | null = null

export const setAccessToken = (token: string | null) => {
  accessToken = token
}

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
  const token = accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response)=>response,
  async (error) => {
    const originalRequest = error.config
    // If access token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh endpoint
        const res = await api.post("/auth/refresh");
        const newToken = res.data.accessToken;
        setAccessToken(newToken);
        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch {
        // Refresh failed → logout
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
)

export default api;
