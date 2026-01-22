
import type { RegisterInput } from "@/types/auth";
import type { EditUserInput } from "@/types/user";
import api from "./axios";


export const createUserByAdminApi = (data: RegisterInput) =>
  api.post("/admin/users", data);

export const getUsersByAdminApi = (params?: {
  search?: string;
  page?: number;
  limit?: number;
}) =>
  api.get("/admin/users", { params });

export const getUserByIdByAdminApi = (userId: string) =>
  api.get(`/admin/users/${userId}`);

export const updateUserByAdminApi = (
  userId: string,
  data: EditUserInput
) =>
  api.patch(`/admin/users/${userId}`, data);

export const deleteUserByAdminApi = (userId: string) =>
  api.delete(`/admin/users/${userId}`);

export const toggleUserStatusByAdminApi = (userId: string) =>
  api.patch(`/admin/users/${userId}/status`);

/* ======================================================
   ADMIN — AVATAR
====================================================== */

export const updateUserAvatarByAdminApi = (
  userId: string,
  file: File
) => {
  const formData = new FormData();
  formData.append("avatar", file);

  return api.post(
    `/admin/users/${userId}/avatar`,
    formData
  );
};

export const deleteUserAvatarByAdminApi = (userId: string) =>
  api.delete(`/admin/users/${userId}/avatar`);
