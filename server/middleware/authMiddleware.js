const jwt = require("jsonwebtoken");

const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check authorization header
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No Token Provided",
      });
    }

    // Check Bearer format
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid Authorization Format",
      });
    }

    // Remove "Bearer " from token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // Store decoded user information
    req.user = decode;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

// Admin authorization
const requireAdmin = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access Denied. Admin Only",
      });
    }

    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Admin Authorization Failed",
    });
  }
};

module.exports = {
  requireSignIn,
  requireAdmin,
};