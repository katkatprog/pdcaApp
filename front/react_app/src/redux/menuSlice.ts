import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MenuState {
  value: {
    visible: boolean;
    cycleId: number;
  };
}

const initialState: MenuState = {
  value: {
    visible: false,
    cycleId: 0,
  },
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    // メニューを表示するReducer
    showMenu: (state, action: PayloadAction<number>) => {
      state.value = {
        visible: true,
        cycleId: action.payload,
      };
    },
    // メニューを隠すReducer
    hideMenu: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { showMenu, hideMenu } = menuSlice.actions;
