const app = require("express")();
const mongoose = require("mongoose");
const morgan = require("morgan");
const { graphqlHTTP } = require("express-graphql");
const { schema } = require("./schema/schema");
const populateDatabase = require("./setup");

mongoose
  .connect("mongodb://0.0.0.0:27017/ecommerce")
  .then((d) => {
    console.log("DB is connected");
    // populateDatabase();
    console.log("Done");
  })
  .catch((e) => {
    console.log("Error connecting to DB");
    console.log(e?.stack);
  });

app.use(morgan("dev"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

module.exports = app;
