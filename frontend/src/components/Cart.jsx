import React, { useMemo } from "react";
import Header from "./Header";
import { Typography, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useSelector, useDispatch } from "react-redux";
import { cartSelector, removeFromCart } from "../features/product/productSlice";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <Box display="flex" alignItems="center" marginY={2}>
      <small variant="body1">
        {product?.name} ({product.count})
      </small>
      <small variant="subtitle1" marginX={2}>
        ${product?.price}
      </small>
      <small style={{ cursor: "pointer" }}>
        <DeleteIcon
          color="error"
          onClick={() => dispatch(removeFromCart(product))}
        />
      </small>
    </Box>
  );
};

function Cart() {
  const cart = useSelector(cartSelector);

  const groupAndCountProducts = (cartItems) => {
    let groupedItems = [];

    return cartItems.reduce((result, currentItem) => {
      const { id, amount } = currentItem;

      // Check if the product is already in the result
      const existingProductIndex = result.findIndex((item) => item.id === id);

      if (existingProductIndex !== -1) {
        // If the product exists, update the count and price
        result[existingProductIndex] = {
          ...result[existingProductIndex],
          count: result[existingProductIndex].count + 1,
          price:
            (result[existingProductIndex].count + 1) *
            parseFloat(amount).toFixed(2),
        };
      } else {
        // If the product doesn't exist, add it to the result with count 1
        result.push({
          ...currentItem,
          count: 1,
          price: parseFloat(amount).toFixed(2),
        });
      }

      return result;
    }, groupedItems);
  };

  const filteredCart = useMemo(() => groupAndCountProducts(cart), [cart]);

  const computeTotalPrice = () =>
    filteredCart.reduce((total, { price }) => total + parseFloat(price), 0);
  const totalPrice = useMemo(() => computeTotalPrice(), [filteredCart]);

  return (
    <>
      <Header />
      <Box display="flex" alignItems="center" marginY={2}>
        <Typography variant="body1">Product</Typography>
        <Typography variant="subtitle1" marginX={2}>
          Price
        </Typography>
        <Typography variant="subtitle1">Action</Typography>
      </Box>
      {filteredCart?.map((product) => (
        <CartItem product={product} />
      ))}

      <Typography variant="body1">Total: ${totalPrice}</Typography>
    </>
  );
}

export default Cart;
