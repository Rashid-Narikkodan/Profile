import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register as registerApi } from "../../../api/auth";
import type { AuthUser, LoginInput } from "../../../types/auth";
import type { RegisterInput } from "../../../types/auth";
import axios from "axios"

export type RegisterApiResponse = {
  success: boolean;
  user: AuthUser;
  accessToken: string;
  message: string;
}
export type LoginApiResponse = {
  success: boolean;
  user: AuthUser;
  accessToken: string;
  message: string;
}
type ErrorResponse={
  success: false
  message: string
}
;


export const registerUser = createAsyncThunk<
  RegisterApiResponse,
  RegisterInput,
  { rejectValue: string }
>(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await registerApi(data)
      return res.data
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
)

export const loginUser = createAsyncThunk<
  LoginApiResponse,
  LoginInput,
  { rejectValue: string }
>(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await login(data)
      return res.data
    } catch (err: unknown) {
      if (axios.isAxiosError<ErrorResponse>(err)) {
        return rejectWithValue(
          err.response?.data?.message ?? "Login failed"
        )
      }

      // Non-Axios / unexpected error
      if (err instanceof Error) {
        return rejectWithValue(err.message)
      }

      return rejectWithValue("Registration failed")
    }
  }
)


