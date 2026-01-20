import { createSlice } from "@reduxjs/toolkit";
import type { AuthUser } from "../../../types/auth";
import { registerUser } from "./auth.thunk";

interface AuthState {
  user: AuthUser | null;
  accessToken:string|null;
  status: 'idle'|'loading'|'authenticated'|'unauthenticated';
  error: string | null;
}

const initialState:AuthState = {
  user: null,
  accessToken: null,
  status: 'idle',
  error: null,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout:()=>initialState
  },
extraReducers: (builder) => {
  builder
    .addCase(registerUser.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.status = 'authenticated'
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.error=null
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.status = 'unauthenticated'
      state.error = action.payload ?? 'Registration failed'
    })
}
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
