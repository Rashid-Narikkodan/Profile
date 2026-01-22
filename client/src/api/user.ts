import type { RegisterInput } from "../types/auth";
import type { EditUserInput } from "../types/user";
import api from "./axios";

 export const getUser = () => api.get("/user/me")
 export const editUser = (data:EditUserInput) => api.patch("/user/me",data)
 export const deleteAvatarApi = ()=> api.delete('/user/me/avatar')

 //admin routes
 export const createUser = (data:RegisterInput) => api.post(`/admin/users/add`,data)
 export const getUsers = (params:{search?:string,page?:number,limit?:number}) => api.get("/admin/users",{params})
 export const getUserById = (userId:string) => api.get(`/admin/users/${userId}`)
export const deleteUserByIdApi = (userId:string)=> api.delete(`/admin/users/${userId}/delete`)
export const updateUser = (userId:string)=> api.patch(`/admin/users/${userId}`)
export const toggleUserStatus = (userId:string)=> api.patch(`/admin/users/${userId}/status`)
