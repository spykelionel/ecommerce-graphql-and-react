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
    removeFromCart: (state, action) => {
      const filteredProducts = state.data.filter(
        ({ id }) => action.payload.id !== id
      );
      state.data = [...filteredProducts];
    },
  },
});

export const { addToCart, removeFromCart } = productSlice.actions;

export const cartSelector = (state) => state.cart.data;

export default productSlice.reducer;
