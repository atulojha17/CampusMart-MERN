
const express = require("express");
const router = express.Router();
const { requireSignIn } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getProfile
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", requireSignIn, getProfile);
module.exports = router;
