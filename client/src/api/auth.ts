import api from "./axios";
import type { RegisterInput, LoginInput } from "../types/auth";

export const register = (data: RegisterInput) => api.post("/auth/register", data)
 export const login = (data: LoginInput) => api.post("/auth/login", data)
 export const getMe = () => api.get("/auth/me")
 export const logout= () => api.post("/auth/logout")
