const app = require("express")();
const mongoose = require("mongoose");
const morgan = require("morgan");
const { graphqlHTTP } = require("express-graphql");
const { schema } = require("./schema/schema");

mongoose
  .connect("mongodb://0.0.0.0:27017/ecommerce")
  .then((d) => console.log("DB is connected"))
  .catch((e) => console.log("Error connecting to DB"));

app.use(morgan("dev"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

exports.default = app;
