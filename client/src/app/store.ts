import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authState/authSlice";
import userReducer from '../features/user/userState/userSlice';
import adminReducer from '../features/user/userState/adminSlice';
import toasterReducer from '../features/toastSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    user:userReducer,
    admin:adminReducer,
    toast:toasterReducer
  }
});

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch