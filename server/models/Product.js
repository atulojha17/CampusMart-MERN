const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    condition: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);