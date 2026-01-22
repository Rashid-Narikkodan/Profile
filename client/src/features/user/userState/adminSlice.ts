import { createSlice } from "@reduxjs/toolkit";
import { createNewUser, deleteAvatarByAdmin, deleteUser, fetchUserByAdmin, fetchUsers, toggleStatus, updateUserByAdmin } from "./admin.thunk";
import type { PublicUser } from "../../../types/user";
import { updateAvatarByAdmin } from "./admin.thunk";

interface AdminState {
  users: PublicUser[];
  data: PublicUser|null;
  meta:{
    page:string
    limit:string
    total:string
    search:string
  }|null
  fetchStatus: "idle" | "loading" | "succeeded" | "failed";
  updateStatus: "idle" | "loading" | "succeeded" | "failed";
  deleteStatus: "idle" | "loading" | "succeeded" | "failed";
  createStatus: "idle" | "loading" | "succeeded" | "failed";

  fetchError: string | null;
  updateError: string | null;
  deleteError: string | null;
  createError: string | null;
}

const initialState: AdminState = {
  users: [],
  data:null,
  meta:null,
  fetchStatus: "idle",
  updateStatus: "idle",
  deleteStatus: "idle",
  createStatus: "idle",
  
  fetchError: null,
  updateError: null,
  deleteError: null,
  createError: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      /* ---------------- FETCH USERS ---------------- */
      .addCase(fetchUsers.pending, (state) => {
        state.fetchStatus = "loading";
        state.fetchError = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.users = action.payload.users;
        state.meta = action.payload.meta;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload ?? "Failed to fetch users";
      })

      /* ---------------- DELETE USER ---------------- */
      .addCase(deleteUser.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        const deletedId = action.payload.userId;

        state.users = state.users.filter(
          (user) => user._id !== deletedId
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload ?? "Failed to delete user";
      })

      /* ---------------- TOGGLE STATUS ---------------- */
      .addCase(toggleStatus.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(toggleStatus.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const updatedUser = action.payload.data;

        const index = state.users.findIndex(
          (u) => u._id === updatedUser._id
        );

        if (index !== -1) {
          state.users[index] = updatedUser;
        }
        if(state.data?._id == updatedUser._id){
          state.data.status = updatedUser.status
        }
      })
      .addCase(toggleStatus.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload ?? "Failed to update user";
      })

      /* ---------------- create usre ---------------- */
      .addCase(createNewUser.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const updatedUser = action.payload?.user;
        state.users.unshift(updatedUser)
      })
      .addCase(createNewUser.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload ?? "Failed to update user";
      })

      /* ---------------- get user by id ---------------- */
      .addCase(fetchUserByAdmin.pending, (state) => {
        state.fetchStatus = "loading";
        state.fetchError = null;
      })
      .addCase(fetchUserByAdmin.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        console.log(action.payload)
        state.data = action.payload.user
      })
      .addCase(fetchUserByAdmin.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload ?? "Failed to update user";
      })
      /* ---------------- update avatar ---------------- */
      .addCase(updateAvatarByAdmin.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(updateAvatarByAdmin.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        console.log(action.payload)
        if(state.data && state.data.avatar){
          state.data.avatar = action.payload
        }
      })
      .addCase(deleteAvatarByAdmin.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload ?? "Failed to update user";
      })
      /* ---------------- update avatar ---------------- */
      .addCase(deleteAvatarByAdmin.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(deleteAvatarByAdmin.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        console.log(action.payload)
        if(state.data){
          state.data.avatar = action.payload
        }
      })
      .addCase(updateAvatarByAdmin.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload ?? "Failed to update user";
      })
      /* ---------------- update user data ---------------- */
      .addCase(updateUserByAdmin.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(updateUserByAdmin.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        console.log(action.payload)
        if(state.data){
        if (state.data) {
          Object.assign(state.data, action.payload);
        }
        }
      })
      .addCase(updateUserByAdmin.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload ?? "Failed to update user";
      });
  },
});

export default adminSlice.reducer;
