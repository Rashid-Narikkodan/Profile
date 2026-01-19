import api from "./axios";
import type { RegisterInput, LoginInput } from "../types/auth";


export const authApi = {
  login: (data: LoginInput) => api.post("/auth/login", data),
  register: (data: RegisterInput) => api.post("/auth/register", data),
  getMe: () => api.get("/auth/me"),
//   logout: () => api.post("/auth/logout"),
};
