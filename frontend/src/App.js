import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  {
    products {
      name
      imageUrl
      amount
      currency
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) console.log(error);
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {data.products.map((product, index) => (
          <li key={index}>
            <img src={product.imageUrl} alt={product.name} />
            <p>{product.name}</p>
            <p>{`${product.amount} ${product.currency}`}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
