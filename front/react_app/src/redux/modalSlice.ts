import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";

export interface ModalIfc {
  visible: boolean;
  cycleId: number;
  cycleName: string;
}

export const modalSlice = createSlice<
  { value: ModalIfc },
  SliceCaseReducers<{ value: ModalIfc }>,
  "eraseModal"
>({
  name: "eraseModal",
  initialState: {
    value: {
      visible: false,
      cycleId: 0,
      cycleName: "",
    },
  },
  reducers: {
    // モーダルを表示するReducer
    showModal: (
      state: { value: ModalIfc },
      action: {
        payload: {
          cycleId: number;
          cycleName: string;
        };
        type: string;
      },
    ) => {
      state.value = {
        visible: true,
        cycleId: action.payload.cycleId,
        cycleName: action.payload.cycleName,
      };
    },
    // モーダルを隠すReducer
    hideModal: (state: { value: ModalIfc }) => {
      state.value = {
        visible: false,
        cycleId: 0,
        cycleName: "",
      };
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
