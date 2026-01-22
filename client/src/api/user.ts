import type { EditUserInput } from "@/types/user";
import api from "./axios";

/* ======================================================
   USER (self)
====================================================== */

export const getMeApi = () => api.get("/user/me");

export const updateMeApi = (data: EditUserInput) =>
  api.patch("/user/me", data);

export const deleteMyAvatarApi = () =>
  api.delete("/user/me/avatar");

/* ======================================================
   ADMIN — USERS
====================================================== */
