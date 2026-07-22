const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("🚀 CampusMart Backend is Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});