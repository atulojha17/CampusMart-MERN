const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  createProduct,
  getProducts,
  getSingleProduct,
  getMyProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { requireSignIn } = require("../middleware/authMiddleware");

// ================= CREATE PRODUCT =================
router.post(
  "/create",
  requireSignIn,
  upload.single("image"),
  createProduct
);

// ================= GET ALL PRODUCTS =================
router.get("/all", getProducts);

// ================= GET MY PRODUCTS =================
router.get("/my-products", requireSignIn, getMyProducts);

// ================= GET SINGLE PRODUCT =================
router.get("/:id", getSingleProduct);

// ================= UPDATE PRODUCT =================
router.put(
  "/update/:id",
  requireSignIn,
  updateProduct
);

// ================= DELETE PRODUCT =================
router.delete(
  "/delete/:id",
  requireSignIn,
  deleteProduct
);

module.exports = router;