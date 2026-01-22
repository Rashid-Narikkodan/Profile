import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Avatar, PublicUser } from "../../../types/user";
import { getUser, editUser, deleteAvatarApi } from "../../../api/user";
import type { EditUserInput } from "../../../types/user";
import api from "../../../api/axios";


type FetchUserResponse = {
    success: true
  user: PublicUser;
};
type ErrorResponse={
  success: false
  message: string
}

export const fetchUser = createAsyncThunk<
  FetchUserResponse,
  void,
  { rejectValue: string }
>(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUser()
      return res.data;
    } catch (err: unknown) {
    if (axios.isAxiosError<ErrorResponse>(err)) {
        return rejectWithValue(
          err.response?.data?.message ?? "Registration failed"
        )
      }

      // Non-Axios / unexpected error
      if (err instanceof Error) {
        return rejectWithValue(err.message)
      }

      return rejectWithValue("Registration failed")
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
      const res = await editUser(data)
      return res.data.user;
  }catch(err:unknown){
    if (axios.isAxiosError<ErrorResponse>(err)) {
        return rejectWithValue(
          err.response?.data?.message ?? "Registration failed"
        )
      }

      // Non-Axios / unexpected error
      if (err instanceof Error) {
        return rejectWithValue(err.message)
      }

      return rejectWithValue("Registration failed")
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
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data?.message ?? "Avatar upload failed"
        );
      }

      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }

      return rejectWithValue("Avatar upload failed");
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
  
      const res = await deleteAvatarApi()
      return res.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data?.message ?? "Avatar upload failed"
        );
      }

      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }

      return rejectWithValue("Avatar upload failed");
    }
  }
);

