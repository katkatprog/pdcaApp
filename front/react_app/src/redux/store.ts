import { configureStore } from "@reduxjs/toolkit";
import { cycleSlice } from "./cycleSlice";
import { cyclesSlice } from "./cyclesSlice";
import { erasedCyclesSlice } from "./erasedCyclesSlice";
import { menuSlice } from "./menuSlice";
import { modalSlice } from "./modalSlice";

export const store = configureStore({
  reducer: {
    cycle: cycleSlice.reducer,
    modal: modalSlice.reducer,
    cycles: cyclesSlice.reducer,
    erasedCycles: erasedCyclesSlice.reducer,
    menu: menuSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
