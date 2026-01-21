import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, updateUser, uploadUserAvatar } from "./user.thunk";
import type { PublicUser } from "../../../types/user";

interface UserState {
  data: PublicUser | null;
  fetchStatus: "idle" | "loading" | "succeeded" | "failed";
  updateStatus: "idle" | "loading" | "succeeded" | "failed";
  avatarStatus: "idle" | "loading" | "succeeded" | "failed";

  fetchError: string | null;
  updateError: string | null;
  avatarError: string | null;
}

const initialState: UserState = {
  data: null,
  fetchStatus: "idle",
  updateStatus: "idle",
  avatarStatus: "idle",

  fetchError: null,
  updateError: null,
  avatarError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser:()=>initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.fetchStatus = "loading";
        state.fetchError = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.data = action.payload.user;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload ?? "Failed to load user";
      })

      .addCase(updateUser.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        if (state.data) {
          Object.assign(state.data, action.payload);
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload ?? "Update failed";
      })

      .addCase(uploadUserAvatar.pending, (state) => {
        state.avatarStatus = "loading";
        state.avatarError = null;
      })
      .addCase(uploadUserAvatar.fulfilled, (state, action) => {
        state.avatarStatus = "succeeded";
        if (state.data) {
          state.data.avatar = action.payload;
        }
      })
      .addCase(uploadUserAvatar.rejected, (state, action) => {
        state.avatarStatus = "failed";
        state.avatarError = action.payload ?? "Avatar upload failed";
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
