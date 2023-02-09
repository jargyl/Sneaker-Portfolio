const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
    },
    name: {
      type: String,
    },
    size: {
      type: String,
    },
    product_url: {
      type: String,
    },
    image_url: {
      type: String,
    },
    alt: {
      type: String,
    },
  },
  { collection: "products" }
);

module.exports = mongoose.model("Product", productSchema);
