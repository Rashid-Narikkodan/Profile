import api from "./axios";
import type { RegisterInput, LoginInput } from "../types/auth";

export const registerApi = (data: RegisterInput) => api.post("/auth/register", data)
 export const loginApi = (data: LoginInput) => api.post("/auth/login", data)
 export const getMeApi = () => api.get("/auth/me")
 export const refreshApi = () => api.post("/auth/refresh", {}, { withCredentials: true })
 export const logoutApi = () => api.post("/auth/logout")
