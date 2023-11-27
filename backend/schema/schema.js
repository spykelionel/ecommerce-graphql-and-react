const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
} = require("graphql");

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    name: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    amount: { type: GraphQLFloat },
    currency: { type: GraphQLString },
  }),
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      products: {
        type: new GraphQLList(ProductType),
        resolve: async () => await Product.find(),
      },
    },
  }),
});

module.exports = {
  ProductType,
  schema,
};
