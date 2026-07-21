const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register User
const registerUser = async (req, res) => {
  try {

    const { name, email, password, phone, address } = req.body;

    // Check empty fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields"
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address
    });

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  registerUser
};