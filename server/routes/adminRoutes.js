const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  getAllProducts,
  deleteAnyProduct,
} = require("../controllers/adminController");

const {
  requireSignIn,
  requireAdmin,
} = require("../middleware/authMiddleware");

// ================= GET ALL USERS =================
router.get(
  "/users",
  requireSignIn,
  requireAdmin,
  getAllUsers
);

// ================= GET ALL PRODUCTS =================
router.get(
  "/products",
  requireSignIn,
  requireAdmin,
  getAllProducts
);

// ================= DELETE ANY PRODUCT =================
router.delete(
  "/product/:id",
  requireSignIn,
  requireAdmin,
  deleteAnyProduct
);

module.exports = router;