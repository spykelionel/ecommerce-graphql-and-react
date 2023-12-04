import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/product/productSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
