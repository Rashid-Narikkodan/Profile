import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAccessToken } from "@/api/axios";
import type { AuthUser, LoginInput, RegisterInput } from "@/types/auth";
import { normalizeApiError } from "@/utils/ApiError";

import {
  loginApi,
  refreshApi,
  registerApi,
  logoutApi,
  getMeApi,
} from "@/api/auth";

type AuthUserData = { user: AuthUser; accessToken: string };

// ---------------- Register Thunk ----------------
export const registerUser = createAsyncThunk<
  AuthUserData,
  RegisterInput,
  { rejectValue: string }
>("auth/registerUser", async (data, { rejectWithValue }) => {
  try {
    const res = await registerApi(data);
    setAccessToken(res.data.accessToken);
    return res.data;
  } catch (error: unknown) {
    return rejectWithValue(normalizeApiError(error));
  }
});

// ---------------- Login Thunk ----------------
export const loginUser = createAsyncThunk<
  AuthUserData,
  LoginInput,
  { rejectValue: string }
>("auth/loginUser", async (data, { rejectWithValue }) => {
  try {
    const res = await loginApi(data);
    setAccessToken(res.data.accessToken);
    return res.data;
  } catch (error: unknown) {
    return rejectWithValue(normalizeApiError(error));
  }
});

// ---------------- Logout Thunk ----------------
export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await logoutApi();
      setAccessToken(null);
      return res.data;
    } catch (error: unknown) {
      return rejectWithValue(normalizeApiError(error));
    }
  },
);

// ---------------- Bootstrap Auth Thunk ----------------
export const bootstrapAuth = createAsyncThunk<
  AuthUserData,
  void,
  { rejectValue: string }
>("auth/bootstrapAuth", async (_, { rejectWithValue }) => {
  try {
    const refreshRes = await refreshApi();
    setAccessToken(refreshRes.data.accessToken);
    const meRes = await getMeApi();

    return { user: meRes.data.user, accessToken: refreshRes.data.accessToken };
  } catch (error: unknown) {
    return rejectWithValue(normalizeApiError(error));
  }
});
