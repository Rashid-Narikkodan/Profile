import type { Avatar, PublicUser } from "@/types/user";
import type { EditUserInput } from "@/types/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMeApi, updateMeApi, deleteMyAvatarApi } from "@/api/user";
import { normalizeApiError } from "@/utils/ApiError";
import api from "@/api/axios";


type FetchUserResponse = {
    success: true
  user: PublicUser;
};

export const fetchUser = createAsyncThunk<
  FetchUserResponse,
  void,
  { rejectValue: string }
>(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getMeApi()
      return res.data;
    } catch (err: unknown) {
      return rejectWithValue(normalizeApiError(err))
    }
    }
);

export const updateUser= createAsyncThunk<
  EditUserInput,
  EditUserInput,
  { rejectValue: string }
>('user/updateUser',
   async (data,{rejectWithValue})=>{
    try {
      const res = await updateMeApi(data)
      return res.data.user;
  }catch(err:unknown){
      return rejectWithValue(normalizeApiError(err))
    }
})

export const uploadUserAvatar = createAsyncThunk<
  Avatar,          // fulfilled return type
  File,          // argument type
  { rejectValue: string }
>(
  "user/uploadAvatar",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await api.post("/user/me/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });


      return res.data.avatar;
    } catch (err: unknown) {
      return rejectWithValue(normalizeApiError(err))
    }
  }
);


export const deleteAvatar = createAsyncThunk<
  Avatar,          // fulfilled return type
  void,          // argument type
  { rejectValue: string }
>(
  "user/deleteAvatar",
  async (_, { rejectWithValue }) => {
    try {
  
      const res = await deleteMyAvatarApi()
      return res.data;
    } catch (err: unknown) {
      return rejectWithValue(normalizeApiError(err))
    }
  }
);

