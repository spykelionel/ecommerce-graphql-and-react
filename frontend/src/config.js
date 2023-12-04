import { createBrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache } from "@apollo/client";

import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

const errorElement = <>This page doesn't exist yet</>;
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductList />,
    errorElement,
  },
  {
    path: "cart",
    element: <Cart />,
    errorElement,
  },
  {},
]);

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export { apolloClient as client, router };
