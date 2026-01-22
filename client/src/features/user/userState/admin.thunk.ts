import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Avatar, EditUserInput, PublicUser } from "../../../types/user";
import {  getUsers, deleteUserByIdApi,toggleUserStatus, createUser, getUserById, deleteAvatarByAdminApi, updateUser } from "../../../api/user";
import type { RegisterInput } from "../../../types/auth";
import api from "../../../api/axios";


type FetchUserResponse = {
    success: true
  user: PublicUser;
};
type ToggleUserStatusResponseType = {
    success: true
    message:string,
  data: PublicUser;
};
type DeleteUserResponseType = {
  userId:string;
  data:{
    success:true,
    message:string
  }
};
type FetchUsersResponse = {
  success: true
  users: PublicUser[];
  meta:{
    page:string
    limit:string
    total:string
    search:string
  }
};
type ErrorResponse={
  success: false
  message: string
}

export const fetchUsers = createAsyncThunk<
  FetchUsersResponse,
  {search?:string,page?:number,limit?:number},
  { rejectValue: string }
>(
  "admin/fetchUsers",
  async (params, { rejectWithValue }) => {
    try {
      const res = await getUsers(params)
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
export const fetchUserByAdmin = createAsyncThunk<
  FetchUserResponse,
  string,
  { rejectValue: string }
>(
  "admin/fetchUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await getUserById(userId)
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
export const createNewUser = createAsyncThunk<
  FetchUserResponse,
 RegisterInput,
  { rejectValue: string }
>(
  "admin/createNewUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createUser(data)
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


export const deleteUser = createAsyncThunk<
  DeleteUserResponseType,          // fulfilled return type
  string,          // argument type
  { rejectValue: string }
>(
  "admin/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
  
      const res = await deleteUserByIdApi(userId)
      return {userId, data:res.data};
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

export const toggleStatus = createAsyncThunk<
  ToggleUserStatusResponseType,          // fulfilled return type
  string,          // argument type
  { rejectValue: string }
>(
  "admin/toggleUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await toggleUserStatus(userId)
      console.log(res.data)
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

export const updateAvatarByAdmin = createAsyncThunk<
  Avatar,          // fulfilled return type
  {file:File,userId:string},          // argument type
  { rejectValue: string }
>(
  "admin/updateAvatarByAdmin",
  async ({file,userId}, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await api.post(`/admin/users/${userId}/avatar`, formData, {
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

export const deleteAvatarByAdmin = createAsyncThunk<
  Avatar,          // fulfilled return type
  string,          // argument type
  { rejectValue: string }
>(
  "admin/deleteAvatarByAdmin",
  async (userId, { rejectWithValue }) => {
    try {
  
      const res = await deleteAvatarByAdminApi(userId)
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


export const updateUserByAdmin= createAsyncThunk<
  EditUserInput,
  {data:EditUserInput,userId:string},
  { rejectValue: string }
>('user/updateUser',
   async ({data,userId},{rejectWithValue})=>{
    try {
      const res = await updateUser(userId,data)
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
