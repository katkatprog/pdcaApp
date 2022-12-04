import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CycleIfc } from "../utils/cycle.interface";

export interface CyclesState {
  value: CycleIfc[];
}

const initialState: CyclesState = {
  value: [],
};

export const cyclesSlice = createSlice({
  name: "cycles",
  initialState,
  reducers: {
    // サイクルにデータをセットするReducer
    setCycles: (state, action: PayloadAction<CycleIfc[]>) => {
      state.value = action.payload;
    },
    // サイクルのstateにデータを追加するReducer
    addCycle: (state, action: PayloadAction<CycleIfc>) => {
      state.value.push(action.payload);
    },
    // サイクルのstateからデータを削除するReducer
    deleteCycle: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter((cycle) => cycle.id != action.payload);
    },
  },
});

export const { addCycle, deleteCycle, setCycles } = cyclesSlice.actions;
