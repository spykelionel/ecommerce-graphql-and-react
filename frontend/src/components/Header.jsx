import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

import { cartSelector } from "../features/product/productSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
  const cart = useSelector(cartSelector);

  return (
    <AppBar position="static">
      <Toolbar style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Typography variant="h6">
          <Link to="/">Product Catalog</Link>
        </Typography>
        <Typography variant="h6">
          <Link to="/cart">Cart {cart.length}</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
