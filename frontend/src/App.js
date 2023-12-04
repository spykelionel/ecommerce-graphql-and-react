import React from "react";
import ProductList from "./components/ProductList";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";

import { cartSelector } from "./features/product/productSlice";
import { useSelector } from "react-redux";

function App() {
  const cart = useSelector(cartSelector);
  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Typography variant="h6">Product Catalog</Typography>
          <Typography variant="h6">Cart {cart.length}</Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ padding: "20px" }}>
        <h1>Product List</h1>
        <ProductList />
      </Container>
    </div>
  );
}

export default App;
