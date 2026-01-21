import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./user.thunk";
import type { PublicUser } from "../../../types/user";


interface UserState {
  data: PublicUser | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  data: null,
  status: "idle",
  error: null,
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser(state) {
      state.data = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload)
        state.data = action.payload.user;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to load user";
      });
  },
});

export const {clearUser} = userSlice.actions;
export default userSlice.reducer;
