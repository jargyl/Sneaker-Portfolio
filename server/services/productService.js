const Product = require("../models/productModel");

module.exports.getAllProducts = async function () {
  const products = await Product.find({});
  return products;
};
