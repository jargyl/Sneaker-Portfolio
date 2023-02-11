const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const { authenticate } = require("../middleware/authentication.js");

router.post("/login", userController.login);

router.get("/verify-token", authenticate, (req, res) => {
  res.status(200).json({ message: "Token is valid." });
});

module.exports = router;
