import { configureStore } from "@reduxjs/toolkit";
import spriteReducer from "./slices/spriteSlice";

const store = configureStore({
  reducer: {
    sprite: spriteReducer,
  },
});

export default store;
