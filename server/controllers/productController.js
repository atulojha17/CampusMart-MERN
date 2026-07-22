const Product = require("../models/Product");

// ================= CREATE PRODUCT =================
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.body;

    if (!name || !description || !price || !category || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      quantity,
    });

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL PRODUCTS =================
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      totalProducts: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET SINGLE PRODUCT =================
const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE PRODUCT =================
const updateProduct = async (req, res) => {
  try {

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// ================= DELETE PRODUCT =================
const deleteProduct = async (req, res) => {
  try {

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// ================= EXPORT =================
module.exports = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
};