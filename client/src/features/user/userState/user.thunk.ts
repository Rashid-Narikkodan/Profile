import type { Avatar, PublicUser } from "@/types/user";
import type { EditUserInput } from "@/types/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMeApi, updateMeApi, deleteMyAvatarApi } from "@/api/user";
import { normalizeApiError } from "@/utils/ApiError";
import api from "@/api/axios";
import { showToast } from "@/app/slices/toastSlice";

type FetchUserResponse = {
  success: true;
  user: PublicUser;
};

export const fetchUser = createAsyncThunk<
  FetchUserResponse,
  void,
  { rejectValue: string }
>("user/fetchUser", async (_, { rejectWithValue, dispatch }) => {
  try {
    const res = await getMeApi();
    return res.data;
  } catch (err: unknown) {
    const error = normalizeApiError(err);
    dispatch(showToast(error, "error"));
    return rejectWithValue(error);
  }
});

export const updateUser = createAsyncThunk<
  EditUserInput,
  EditUserInput,
  { rejectValue: string }
>("user/updateUser", async (data, { rejectWithValue, dispatch }) => {
  try {
    const res = await updateMeApi(data);
    dispatch(showToast("User info updated successfully", "success"));
    return res.data.user;
  } catch (err: unknown) {
    const error = normalizeApiError(err);
    dispatch(showToast(error, "error"));
    return rejectWithValue(error);
  }
});

export const uploadUserAvatar = createAsyncThunk<
  Avatar, // fulfilled return type
  File, // argument type
  { rejectValue: string }
>("user/uploadAvatar", async (file, { rejectWithValue, dispatch }) => {
  try {
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await api.post("/user/me/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    dispatch(showToast("User Avatar updated successfully", "success"));
    return res.data.avatar;
  } catch (err: unknown) {
    const error = normalizeApiError(err);
    dispatch(showToast(error, "error"));
    return rejectWithValue(error);
  }
});

export const deleteAvatar = createAsyncThunk<
  Avatar,
  void,
  { rejectValue: string }
>("user/deleteAvatar", async (_, { rejectWithValue, dispatch }) => {
  try {
    const res = await deleteMyAvatarApi();
    dispatch(showToast("User's Avatar Deleted Successfully", "success"));
    return res.data;
  } catch (err: unknown) {
    const error = normalizeApiError(err);
    dispatch(showToast(error, "error"));
    return rejectWithValue(error);
  }
});
