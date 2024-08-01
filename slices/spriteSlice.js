import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  position: { x: 0, y: 0 },
};

const spriteSlice = createSlice({
  name: "sprite",
  initialState,
  reducers: {
    setSpritePosition: (state, action) => {
      state.position = action.payload;
    },
  },
});

export const { setSpritePosition } = spriteSlice.actions;
export default spriteSlice.reducer;
