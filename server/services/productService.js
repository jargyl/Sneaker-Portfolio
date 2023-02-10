const Product = require("../models/productModel");

module.exports.getAllProducts = async function () {
  const products = await Product.find({});
  return products;
};

module.exports.addProduct = async function (product) {
  console.log("Creating new product");
  const newProduct = new Product({
    sku: product.sku,
    name: product.name,
    size: product.size,
    product_url: product.product_url,
    image_url: product.image_url,
    alt: product.alt,
  });
  return await newProduct.save();
};
