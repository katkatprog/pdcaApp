import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CycleIfc } from "../utils/cycle.interface";

export interface CyclesState {
  value: CycleIfc[];
}

const initialState: CyclesState = {
  value: [],
};

export const erasedCyclesSlice = createSlice({
  name: "cycles",
  initialState,
  reducers: {
    // サイクルにデータをセットするReducer
    setErasedCycles: (state, action: PayloadAction<CycleIfc[]>) => {
      state.value = action.payload;
    },
    // サイクルのstateにデータを追加するReducer
    addErasedCycle: (state, action: PayloadAction<CycleIfc>) => {
      state.value.push(action.payload);
    },
    // サイクルのstateからデータを削除するReducer
    deleteErasedCycle: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter((cycle) => cycle.id != action.payload);
    },
  },
});

export const { addErasedCycle, deleteErasedCycle, setErasedCycles } =
  erasedCyclesSlice.actions;
