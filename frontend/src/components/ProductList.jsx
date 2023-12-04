// src/components/ProductList.js
import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Button,
  Typography,
  Grid,
  CircularProgress,
  Box,
} from "@mui/material";

import { useDispatch } from "react-redux";

import { addToCart } from "../features/product/productSlice";
import Header from "./Header";

const GET_PRODUCTS = gql`
  query GetProducts($start: Int, $limit: Int) {
    products(start: $start, limit: $limit) {
      name
      imageUrl
      amount
      currency
    }
  }
`;

const ProductList = () => {
  const [page, setPage] = useState(1);
  const limit = 100;
  const [countProduct, setCountProduct] = useState(limit);

  const { loading, error, data, fetchMore } = useQuery(GET_PRODUCTS, {
    variables: { start: 0, limit },
  });

  const [products, setProducts] = useState(data?.products);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) setIsLoading(true);
    else {
      setProducts(data?.products);
      setIsLoading(false);
    }
  }, [data]);
  useEffect(() => setCountProduct(products?.length), [products]);

  const loadMoreProducts = () => {
    setIsLoading(true);
    fetchMore({
      variables: { start: page * limit, limit },
    }).then(({ data: moreData }) => {
      setProducts([...products, ...moreData?.products]);
      setIsLoading(false);
    });
    setPage(page + 1);
    setIsLoading(false);
  };

  return (
    <div>
      <Header />
      <Container style={{ padding: "20px" }}>
        <h1>Product List</h1>
      </Container>
      <Grid container spacing={3}>
        {products?.map((product) => (
          <Grid item key={product?.name} xs={12} sm={6} md={4}>
            <Card>
              {product?.imageUrl ? (
                <CardMedia
                  component="img"
                  height="140"
                  image={product?.imageUrl}
                  alt={product?.name}
                />
              ) : (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              )}

              <CardContent>
                <Typography variant="h6">{product?.name}</Typography>
                <Typography variant="body1">
                  Price: {product?.amount?.toString().slice(0, 4)}{" "}
                  {product?.currency}
                </Typography>
                {/* Add more product details as needed */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => dispatch(addToCart(product))}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {isLoading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      <Grid>
        <pre>Displaying: {countProduct}</pre>
      </Grid>
      <Button variant="contained" color="primary" onClick={loadMoreProducts}>
        Load More
      </Button>
    </div>
  );
};

export default ProductList;
