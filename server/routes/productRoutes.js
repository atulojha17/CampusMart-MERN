const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

router.post("/create", createProduct);

router.get("/all", getProducts);

router.get("/:id", getSingleProduct);

router.put("/update/:id", updateProduct);

router.delete("/delete/:id", deleteProduct);

module.exports = router;