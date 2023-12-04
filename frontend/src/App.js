import React from "react";
import { Provider } from "react-redux";
import "./index.css";

import { ApolloProvider } from "@apollo/client";
import { store } from "./store";
import { RouterProvider } from "react-router-dom";
import { router, client } from "./config";

function App() {
  return (
    <>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <RouterProvider router={router} />
        </ApolloProvider>
      </Provider>
    </>
  );
}

export default App;
