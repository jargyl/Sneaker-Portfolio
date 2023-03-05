const Product = require("../models/productModel");
const fetch = require("node-fetch");

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

module.exports.scrapeProductData = async function (size, sku) {
  try {
    sku = sku.toUpperCase();
    const query_url = `https://restocks.net/nl/shop/search?q=${sku}&page=1`;
    const response = await fetch(query_url);
    const data = await response.json();
    if (data["data"] && data["data"].length > 0) {
      const product = data["data"][0];
      if (product["sku"] == sku) {
        const newProduct = new Product({
          sku: sku,
          name: product["name"],
          size: size,
          product_url: product["slug"],
          image_url: product["image"],
          alt: product["slug"].replace(product["slug"].slice(0, 26), ""),
        });
        await newProduct.save();
        return {
          status: 200,
          message: "Product added successfully!",
          product: newProduct,
        };
      }
    }
    return {
      status: 404,
      message: "Product not found.",
    };
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      message: "Internal server error.",
    };
  }
};
