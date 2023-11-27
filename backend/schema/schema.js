const mongoose = require("mongoose");
const Product = require("../models/Product");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLID,
  GraphQLInt, // Import GraphQLInt for pagination
} = require("graphql");

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    amount: { type: GraphQLFloat },
    currency: { type: GraphQLString },
  }),
});

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    products: {
      type: new GraphQLList(ProductType),
      args: {
        start: { type: GraphQLInt, defaultValue: 0 },
        limit: { type: GraphQLInt, defaultValue: 100 },
      },
      resolve: async (_, { start, limit }) => {
        const products = await Product.find().skip(start).limit(limit);
        return products;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: QueryType,
});

module.exports = {
  ProductType,
  schema,
};
