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
