import { createAsyncThunk } from "@reduxjs/toolkit";
import { register as registerApi } from "../../../api/auth";
import type { AuthUser } from "../../../types/auth";
import type { RegisterInput } from "../../../types/auth";

export type RegisterApiResponse = {
  success: boolean;
  user: AuthUser;
  accessToken: string;
  message: string;
};

export const registerUser = createAsyncThunk<
  RegisterApiResponse,
  RegisterInput,
  { rejectValue: string }
>("auth/registerUser", async (data, { rejectWithValue }) => {
  try {
    const res = await registerApi(data);
    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue("Registration failed");
  }
});
