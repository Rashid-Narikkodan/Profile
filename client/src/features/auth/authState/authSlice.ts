import { createSlice } from "@reduxjs/toolkit";
import type { AuthUser } from "../../../types/auth";
import { bootstrapAuth, loginUser, logoutUser, registerUser } from "./auth.thunk";

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
  reducers: {},
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
    })
    .addCase(registerUser.rejected, (state, action) => {
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
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.status = "unauthenticated";
      state.error = action.payload ?? "Login failed";
    })

    .addCase(bootstrapAuth.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(bootstrapAuth.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.status = "authenticated";
    })
    .addCase(bootstrapAuth.rejected, (state) => {
      state.user = null;
      state.accessToken = null;
      state.status = "unauthenticated";
    })

    .addCase(logoutUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.accessToken = null;
      state.status = "idle";
      state.error = null;
    })
    .addCase(logoutUser.rejected, (state) => {
      state.user = null;
      state.accessToken = null;
      state.status = "idle";
    });
},

});

// export const {  } = authSlice.actions;
export default authSlice.reducer;
