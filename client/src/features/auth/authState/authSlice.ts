import { createSlice } from "@reduxjs/toolkit";
import type { AuthUser } from "../../../types/auth";
import { bootstrapAuth, loginUser, registerUser } from "./auth.thunk";
import { setAccessToken } from "../../../api/axios";

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  status: "idle" | "loading" | "authenticated" | "unauthenticated";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.status = "unauthenticated";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.error = null;
        setAccessToken(action.payload.accessToken)
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log("rejected ", action.payload);
        state.status = "unauthenticated";
        state.error = action.payload ?? "Registration failed";
      })   

      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.error = null;
        setAccessToken(action.payload.accessToken)
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("rejected ", action.payload);
        state.status = "unauthenticated";
        state.error = action.payload ?? "Registration failed";
      })
      
      .addCase(bootstrapAuth.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(bootstrapAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.status = "authenticated";
        setAccessToken(action.payload.accessToken)
      })
      .addCase(bootstrapAuth.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.status = "unauthenticated";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
