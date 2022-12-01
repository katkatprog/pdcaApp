import { configureStore } from "@reduxjs/toolkit";
import { eraseModalSlice } from "./eraseModalSlice";

export const store = configureStore({
  reducer: {
    eraseModal: eraseModalSlice.reducer,
  },
});
