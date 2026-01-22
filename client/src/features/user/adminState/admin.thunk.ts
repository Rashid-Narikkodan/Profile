import type {
  FetchUsersResponse,
  FetchUserResponse,
  DeleteUserResponseType,
  ToggleUserStatusResponseType,
} from "@/types/admin";
import type { Avatar, EditUserInput } from "@/types/user";
import type { RegisterInput } from "@/types/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUsersByAdminApi,
  getUserByIdByAdminApi,
  createUserByAdminApi,
  updateUserByAdminApi,
  deleteUserByAdminApi,
  toggleUserStatusByAdminApi,
  deleteUserAvatarByAdminApi,
  updateUserAvatarByAdminApi,
} from "@/api/admin";
import { normalizeApiError } from "@/utils/ApiError";

// =======================
// Fetch Users
// =======================
export const fetchUsersByAdmin = createAsyncThunk<
  FetchUsersResponse,
  { search?: string; page?: number; limit?: number },
  { rejectValue: string }
>("admin/fetchUsersByAdmin", async (params, { rejectWithValue }) => {
  try {
    const res = await getUsersByAdminApi(params);
    return res.data;
  } catch (err: unknown) {
    return rejectWithValue(normalizeApiError(err));
  }
});

export const fetchUserByAdmin = createAsyncThunk<
  FetchUserResponse,
  string,
  { rejectValue: string }
>("admin/fetchUserByAdmin", async (userId, { rejectWithValue }) => {
  try {
    const res = await getUserByIdByAdminApi(userId);
    return res.data;
  } catch (err: unknown) {
    return rejectWithValue(normalizeApiError(err));
  }
});

// =======================
// Create / Update Users
// =======================
export const createUserByAdmin = createAsyncThunk<
  FetchUserResponse,
  RegisterInput,
  { rejectValue: string }
>("admin/createUserByAdmin", async (data, { rejectWithValue }) => {
  try {
    const res = await createUserByAdminApi(data);
    return res.data;
  } catch (err: unknown) {
    return rejectWithValue(normalizeApiError(err));
  }
});

export const updateUserByAdmin = createAsyncThunk<
  EditUserInput,
  { data: EditUserInput; userId: string },
  { rejectValue: string }
>("admin/updateUserByAdmin", async ({ data, userId }, { rejectWithValue }) => {
  try {
    const res = await updateUserByAdminApi(userId, data);
    return res.data.user;
  } catch (err: unknown) {
    return rejectWithValue(normalizeApiError(err));
  }
});

// ------------------------Delete / Toggle Status------------------------
export const deleteUserByAdmin = createAsyncThunk<
  DeleteUserResponseType & { userId: string },
  string,
  { rejectValue: string }
>("admin/deleteUserByAdmin", async (userId, { rejectWithValue }) => {
  try {
    const res = await deleteUserByAdminApi(userId);
    return { userId, data: res.data };
  } catch (err: unknown) {
    return rejectWithValue(normalizeApiError(err));
  }
});

export const toggleUserStatusByAdmin = createAsyncThunk<
  ToggleUserStatusResponseType,
  string,
  { rejectValue: string }
>("admin/toggleUserStatusByAdmin", async (userId, { rejectWithValue }) => {
  try {
    const res = await toggleUserStatusByAdminApi(userId);
    return res.data;
  } catch (err: unknown) {
    return rejectWithValue(normalizeApiError(err));
  }
});

// =======================
// Avatar Management
// =======================
export const updateAvatarByAdmin = createAsyncThunk<
  Avatar,
  { file: File; userId: string },
  { rejectValue: string }
>(
  "admin/updateAvatarByAdmin",
  async ({ file, userId }, { rejectWithValue }) => {
    try {
     const res = await updateUserAvatarByAdminApi(userId,file)
      return res.data.avatar;
    } catch (err: unknown) {
      return rejectWithValue(normalizeApiError(err));
    }
  },
);

export const deleteAvatarByAdmin = createAsyncThunk<
  Avatar,
  string,
  { rejectValue: string }
>("admin/deleteAvatarByAdmin", async (userId, { rejectWithValue }) => {
  try {
    const res = await deleteUserAvatarByAdminApi(userId);
    return res.data;
  } catch (err: unknown) {
    return rejectWithValue(normalizeApiError(err));
  }
});
