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
