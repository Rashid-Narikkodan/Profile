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
import { showToast } from "@/app/slices/toastSlice";

// =======================
// Fetch Users
// =======================
export const fetchUsersByAdmin = createAsyncThunk<
  FetchUsersResponse,
  { search?: string; page?: number; limit?: number },
  { rejectValue: string}
>("admin/fetchUsersByAdmin", async (params, { rejectWithValue, dispatch }) => {
  try {
    const res = await getUsersByAdminApi(params);
    return res.data;
  } catch (err: unknown) {
    const error = normalizeApiError(err)
    dispatch(showToast(error,'error'))
    return rejectWithValue(error);
  }
});  

export const fetchUserByAdmin = createAsyncThunk<
  FetchUserResponse,
  string,
  { rejectValue: string }
>("admin/fetchUserByAdmin", async (userId, { rejectWithValue, dispatch }) => {
  try {
    const res = await getUserByIdByAdminApi(userId);
    return res.data;
  } catch (err: unknown) {
    const error = normalizeApiError(err)
    dispatch(showToast(error,'error'))
    return rejectWithValue(error);    
  }
});

// =======================
// Create / Update Users
// =======================
export const createUserByAdmin = createAsyncThunk<
  FetchUserResponse,
  RegisterInput,
  { rejectValue: string }
>("admin/createUserByAdmin", async (data, { rejectWithValue, dispatch }) => {
  try {
    const res = await createUserByAdminApi(data);
    dispatch(showToast('New User created successfully','success'))
    return res.data;
  } catch (err: unknown) {
    const error = normalizeApiError(err)
    dispatch(showToast(error,'error'))
    return rejectWithValue(error);    
  }
});

export const updateUserByAdmin = createAsyncThunk<
  EditUserInput,
  { data: EditUserInput; userId: string },
  { rejectValue: string }
>("admin/updateUserByAdmin", async ({ data, userId }, { rejectWithValue, dispatch }) => {
  try {
    const res = await updateUserByAdminApi(userId, data);
    dispatch(showToast('User update successfully','success'))
    return res.data.user;
  } catch (err: unknown) {
    const error = normalizeApiError(err)
    dispatch(showToast(error,'error'))
    return rejectWithValue(error);    
  }
});

// ------------------------Delete / Toggle Status------------------------
export const deleteUserByAdmin = createAsyncThunk<
  DeleteUserResponseType & { userId: string },
  string,
  { rejectValue: string }
>("admin/deleteUserByAdmin", async (userId, { rejectWithValue,dispatch }) => {
  try {
    const res = await deleteUserByAdminApi(userId);
    dispatch(showToast('User deleted successfully','success'))
    return { userId, data: res.data };
  } catch (err: unknown) {
    const error = normalizeApiError(err)
    dispatch(showToast(error,'error'))
    return rejectWithValue(error);    
  }
});

export const toggleUserStatusByAdmin = createAsyncThunk<
  ToggleUserStatusResponseType,
  string,
  { rejectValue: string }
  >("admin/toggleUserStatusByAdmin", async (userId, { rejectWithValue, dispatch }) => {
    try {
      const res = await toggleUserStatusByAdminApi(userId);
      dispatch(showToast('User status updated successfully','success'))
      return res.data;
    } catch (err: unknown) {
      const error = normalizeApiError(err)
      dispatch(showToast(error,'error'))
    return rejectWithValue(error);    
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
    async ({ file, userId }, { rejectWithValue,dispatch }) => {
      try {
        console.log(file)
        const res = await updateUserAvatarByAdminApi(userId,file)
        dispatch(showToast("User Avatar updated successfully",'success'))
        return res.data.avatar;
      } catch (err: unknown) {
        const error = normalizeApiError(err)
        dispatch(showToast(error,'error'))
        return rejectWithValue(error);    
      }
    },
  );
  

export const deleteAvatarByAdmin = createAsyncThunk<
Avatar,
string,
{ rejectValue: string }
>("admin/deleteAvatarByAdmin", async (userId, { rejectWithValue,dispatch }) => {
  try {
    const res = await deleteUserAvatarByAdminApi(userId);
    dispatch(showToast('User Avatar deleted successfully','success'))
    return res.data;
  } catch (err: unknown) {
    const error = normalizeApiError(err)
    dispatch(showToast(error,'error'))
    return rejectWithValue(error);    
  }
});
