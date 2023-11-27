import React from "react";
import ProductList from "./components/ProductList";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";

function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Product Catalog</Typography>
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
