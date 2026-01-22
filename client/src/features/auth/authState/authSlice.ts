import { createSlice } from "@reduxjs/toolkit";
import type { AuthUser } from "@/types/auth";
import { bootstrapAuth, loginUser, logoutUser, registerUser } from "./auth.thunk";

// ------------------------- State Interface -------------------------
interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  status: "idle" | "loading" | "authenticated" | "unauthenticated";
  loginError: string | null;
  registerError: string | null;
  bootstrapError: string | null;
  logoutError: string | null; // optional, for capturing logout failures if needed
}

// ------------------------- Initial State -------------------------
const initialState: AuthState = {
  user: null,
  accessToken: null,
  status: "idle",
  loginError: null,
  registerError: null,
  bootstrapError: null,
  logoutError: null,
};

// ------------------------- Slice -------------------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Optional synchronous reducers if needed
    resetErrors: (state) => {
      state.loginError = null;
      state.registerError = null;
      state.bootstrapError = null;
      state.logoutError = null;
    },
  },
  extraReducers: (builder) => {
    // ---------------- Register ----------------
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.registerError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "unauthenticated";
        state.registerError = action.payload ?? "Registration failed";
      });

    // ---------------- Login ----------------
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.loginError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "unauthenticated";
        state.loginError = action.payload ?? "Login failed";
      });

    // ---------------- Bootstrap Auth ----------------
    builder
      .addCase(bootstrapAuth.pending, (state) => {
        state.status = "loading";
        state.bootstrapError = null;
      })
      .addCase(bootstrapAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.status = "authenticated";
        state.bootstrapError = null;
      })
      .addCase(bootstrapAuth.rejected, (state, action) => {
        state.user = null;
        state.accessToken = null;
        state.status = "unauthenticated";
        state.bootstrapError = action.payload ?? "Failed to refresh session";
      });

    // ---------------- Logout ----------------
    builder
      .addCase(logoutUser.pending, (state) => {
        state.logoutError = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.status = "idle";
        state.logoutError = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.user = null;
        state.accessToken = null;
        state.status = "idle";
        state.logoutError = action.payload ?? "Logout failed";
      });
  },
});

// ------------------------- Exports -------------------------
export const { resetErrors } = authSlice.actions;
export default authSlice.reducer;
