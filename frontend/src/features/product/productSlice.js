import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const productSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.data = [...state.data, action.payload];
    },
  },
});

export const { addToCart } = productSlice.actions;

export default productSlice.reducer;
