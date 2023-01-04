import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditCycleIfc } from "../utils/interface";

export interface CycleState {
  value: EditCycleIfc;
}

const initialState: CycleState = {
  value: {
    name: "",
    goal: "",
    about: "",
    suspend: false,
    watchFromAnyone: false,
  },
};

export const cycleSlice = createSlice({
  name: "cycle",
  initialState,
  reducers: {
    // サイクルにデータをセットするReducer
    setCycle: (state, action: PayloadAction<EditCycleIfc>) => {
      state.value = action.payload;
    },
    // 初期化するReducer
    refreshCycle: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { setCycle, refreshCycle } = cycleSlice.actions;
