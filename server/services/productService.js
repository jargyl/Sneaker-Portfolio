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

module.exports.deleteProduct = async function (productId) {
  console.log("Deleting product");
  return await Product.findByIdAndDelete(productId);
};

module.exports.updateProduct = async function (id, updates) {
  console.log("Updating product");
  return await Product.findByIdAndUpdate(id, updates, { new: true });
};
