import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";

interface eraseModalIfc {
  visible: boolean;
  cycleId: number;
  cycleName: string;
}

export const eraseModalSlice = createSlice<
  { value: eraseModalIfc },
  SliceCaseReducers<{ value: eraseModalIfc }>,
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
      state: { value: eraseModalIfc },
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
    hideModal: (state: { value: eraseModalIfc }) => {
      state.value = {
        visible: false,
        cycleId: 0,
        cycleName: "",
      };
    },
  },
});

export const { showModal, hideModal } = eraseModalSlice.actions;
