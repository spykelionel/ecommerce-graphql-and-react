const mongoose = require("mongoose");

const Product = mongoose.model("Product", {
  name: String,
  imageUrl: String,
  amount: Number,
  currency: String,
});

module.exports = Product;
