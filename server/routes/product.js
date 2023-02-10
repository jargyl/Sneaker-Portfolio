const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { authenticate, authorize } = require("../middleware/authentication");

router.get(
  "/all",
  authenticate,
  authorize({ role: "admin" }, { role: "user", owner: true }),
  productController.getAllproducts
);

router.post(
  "/add",
  authenticate,
  authorize({ role: "admin" }, { role: "user", owner: true }),
  productController.addProduct
);

module.exports = router;
