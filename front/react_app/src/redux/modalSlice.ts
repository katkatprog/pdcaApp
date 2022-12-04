import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
  value: {
    visible: boolean;
    cycleId: number;
    cycleName: string;
  };
}

export interface ModalInfo {
  cycleId: number;
  cycleName: string;
}

const initialState: ModalState = {
  value: {
    visible: false,
    cycleId: 0,
    cycleName: "",
  },
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // モーダルを表示するReducer
    showModal: (state, action: PayloadAction<ModalInfo>) => {
      state.value = {
        visible: true,
        cycleId: action.payload.cycleId,
        cycleName: action.payload.cycleName,
      };
    },
    // モーダルを隠すReducer
    hideModal: (state) => {
      state.value = {
        visible: false,
        cycleId: 0,
        cycleName: "",
      };
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
