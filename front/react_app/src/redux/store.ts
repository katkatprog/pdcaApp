import { configureStore } from "@reduxjs/toolkit";
import { cyclesSlice } from "./cyclesSlice";
import { erasedCyclesSlice } from "./erasedCyclesSlice";
import { modalSlice } from "./modalSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    cycles: cyclesSlice.reducer,
    erasedCycles: erasedCyclesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
