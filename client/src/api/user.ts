import type { EditUserInput } from "../types/user";
import api from "./axios";

 export const getUser = () => api.get("/user/me")
 export const editUser = (data:EditUserInput) => api.patch("/user/me",data)
