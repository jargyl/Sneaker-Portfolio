const productService = require("../services/productService");

module.exports.getAllproducts = async function (req, res, next) {
  try {
    const status = 200;
    const product = await productService.getAllProducts();
    res.status(status).json(product);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports.addProduct = async function (req, res, next) {
  try {
    console.log(req.body);
    const status = 200;
    const product = req.body;
    const newProduct = await productService.addProduct(product);
    res.status(status).json(newProduct);
    console.log("Product added");
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports.deleteProduct = async function (req, res, next) {
  try {
    const status = 200;
    const productId = req.params.id;
    const deletedProduct = await productService.deleteProduct(productId);
    res.status(status).json(deletedProduct);
    console.log("Product deleted");
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports.updateProduct = async function (req, res, next) {
  try {
    const status = 200;
    const id = req.params.id;
    const updates = req.body;
    const updatedProduct = await productService.updateProduct(id, updates);
    res.status(status).json(updatedProduct);
    console.log("Product updated");
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports.scrapeProductData = async function (req, res, next) {
  try {
    const status = 200;
    const size = req.body.size;
    const sku = req.body.sku;
    const scrapedProduct = await productService.scrapeProductData(size, sku);
    res.status(status).json(scrapedProduct);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};
