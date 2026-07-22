const jwt = require("jsonwebtoken");

const requireSignIn = async (req, res, next) => {
  try {

    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No Token Provided"
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid Token"
    });

  }
};

module.exports = {
  requireSignIn
};