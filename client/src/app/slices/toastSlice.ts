import { createSlice, type PayloadAction, nanoid } from "@reduxjs/toolkit";

type ToastType = "success" | "error" | "info" | "warning";

export type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

const toastSlice = createSlice({
  name: "toast",
  initialState: [] as Toast[],
  reducers: {
    showToast: {
      prepare(message: string, type: ToastType = "info") {
        return {
          payload: {
            id: nanoid(),
            message,
            type,
          },
        };
      },
      reducer(state, action: PayloadAction<Toast>) {
        state.push(action.payload);
        if (state.length > 5) state.shift();
      },
    },
    removeToast(state, action: PayloadAction<string>) {
      return state.filter((t) => t.id !== action.payload);
    },
  },
});

export const { showToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
