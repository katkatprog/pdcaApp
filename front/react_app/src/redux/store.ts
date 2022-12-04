import { configureStore } from "@reduxjs/toolkit";
import { cyclesSlice } from "./cyclesSlice";
import { modalSlice } from "./modalSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    cycles: cyclesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
