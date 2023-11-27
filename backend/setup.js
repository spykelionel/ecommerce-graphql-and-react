const Product = require("./models/Product");

const populateDatabase = async () => {
  console.log("Populating DB");
  for (let i = 0; i < 500; i++) {
    const product = new Product({
      name: `Product ${i + 1}`,
      imageUrl: `https://picsum.photos/200/300?random=${i + 1}`,
      amount: Math.random() * 100,
      currency: "USD",
    });
    await product.save();
    console.log(product?.id);
  }
  console.log("Done Populating DB");
};

module.exports = populateDatabase;
