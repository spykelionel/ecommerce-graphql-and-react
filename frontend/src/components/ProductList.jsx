// src/components/ProductList.js
import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  CircularProgress,
  Box,
} from "@mui/material";

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
  const productsPerPage = 100;
  const [countProduct, setCountProduct] = useState(productsPerPage);

  const { loading, error, data, fetchMore } = useQuery(GET_PRODUCTS, {
    variables: { start: 0, limit: productsPerPage },
  });

  const [products, setProducts] = useState(data?.products);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    setProducts(data?.products);
  }, [data]);
  useEffect(() => setCountProduct(products?.length), [products]);

  const loadMoreProducts = () => {
    setIsLoading(true);
    fetchMore({
      variables: { start: page * productsPerPage, limit: productsPerPage },
    }).then(({ data: moreData }) => {
      setProducts([...products, ...moreData?.products]);
      setIsLoading(false);
    });
    setPage(page + 1);
    setIsLoading(false);
  };

  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
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
                  onClick={() => alert(`${product?.name} added to cart`)}
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
