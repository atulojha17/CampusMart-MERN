const express = require("express");
const router = express.Router();

const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require("../controllers/wishlistController");

const { requireSignIn } = require("../middleware/authMiddleware");

// Add product to wishlist
router.post("/add", requireSignIn, addToWishlist);

// Remove product from wishlist
router.delete("/remove/:productId", requireSignIn, removeFromWishlist);

// Get logged-in user's wishlist
router.get("/my-wishlist", requireSignIn, getWishlist);

module.exports = router;