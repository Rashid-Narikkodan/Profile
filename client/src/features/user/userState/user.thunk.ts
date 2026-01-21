import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { PublicUser } from "../../../types/user";
import { getUser } from "../../../api/user";

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
  "auth/fetchUser",
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
