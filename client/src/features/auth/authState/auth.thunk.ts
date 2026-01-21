import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AuthUser, LoginInput, RegisterInput } from "../../../types/auth";
import axios from "axios";
import api, { setAccessToken } from "../../../api/axios";
import { login as loginApi, refresh as refreshApi, register as registerApi, logout as logoutApi } from "../../../api/auth";

// ---------------- Types ----------------
export type AuthApiResponse = {
  success: boolean;
  user: AuthUser;
  accessToken: string;
  message: string;
};

type ErrorResponse = {
  success: false;
  message: string;
};

// ---------------- Register Thunk ----------------
export const registerUser = createAsyncThunk<
  { user: AuthUser; accessToken: string },
  RegisterInput,
  { rejectValue: string }
>(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      // Send register request with cookies if backend sets refresh token
      const res = await registerApi(data);
      setAccessToken(res.data.accessToken)
      // Return only necessary data
      return { user: res.data.user, accessToken: res.data.accessToken };
    } catch (err: unknown) {
      if (axios.isAxiosError<ErrorResponse>(err)) {
        return rejectWithValue(err.response?.data?.message ?? "Registration failed");
      }
      if (err instanceof Error) return rejectWithValue(err.message);
      return rejectWithValue("Registration failed");
    }
  }
);

// ---------------- Login Thunk ----------------
export const loginUser = createAsyncThunk<
  { user: AuthUser; accessToken: string },
  LoginInput,
  { rejectValue: string }
>(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await loginApi(data);
      setAccessToken(res.data.accessToken)
      return { user: res.data.user, accessToken: res.data.accessToken };
    } catch (err: unknown) {
      if (axios.isAxiosError<ErrorResponse>(err)) {
        return rejectWithValue(err.response?.data?.message ?? "Login failed");
      }
      if (err instanceof Error) return rejectWithValue(err.message);
      return rejectWithValue("Login failed");
    }
  }
);

export const logoutUser = createAsyncThunk<
  unknown,
    void,
  { rejectValue: string }
>("auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await logoutApi();
      setAccessToken(null)
      return res.data;
    } catch (err: unknown) {
      if (axios.isAxiosError<ErrorResponse>(err)) {
        return rejectWithValue(err.response?.data?.message ?? "Login failed");
      }
      if (err instanceof Error) return rejectWithValue(err.message);
      return rejectWithValue("Login failed");
    }
  }
);

// ---------------- Bootstrap Auth Thunk ----------------
export const bootstrapAuth = createAsyncThunk<
  { user: AuthUser; accessToken: string },
  void,
  { rejectValue: string }
  >(
    "auth/bootstrapAuth",
    async (_, { rejectWithValue }) => {
      try {
        // 1. Call refresh endpoint to get new access token
        const refreshRes = await refreshApi();
        const accessToken = refreshRes.data.accessToken;
        console.log("Response :-",refreshRes)
        // 2. Fetch current authenticated user
        const meRes = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true, // ensure cookies are sent if needed
        });
        
         setAccessToken(refreshRes.data.accessToken)
      return { user: meRes.data.user, accessToken: refreshRes.data.accessToken };
      } catch (err: unknown) {
      console.log("BootstrapAuth error:", err);
      if (err instanceof Error) return rejectWithValue(err.message || "Unable to refresh session");
      return rejectWithValue("Unable to refresh session");
    }
  }
);
