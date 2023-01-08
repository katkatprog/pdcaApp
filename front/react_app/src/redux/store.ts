import { configureStore } from "@reduxjs/toolkit";
import { cyclesSlice } from "./cyclesSlice";
import { erasedCyclesSlice } from "./erasedCyclesSlice";
import { menuSlice } from "./menuSlice";

export const store = configureStore({
  reducer: {
    cycles: cyclesSlice.reducer,
    erasedCycles: erasedCyclesSlice.reducer,
    menu: menuSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
