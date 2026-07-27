import api from "../services/api";
import { useState } from "react";

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    condition: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/product/create", formData);

    alert(response.data.message);

    setFormData({
      name: "",
      price: "",
      category: "",
      condition: "",
      description: "",
    });

  } catch (error) {
    alert(error.response?.data?.message || "Something went wrong");
    console.log(error);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-xl">

        <h1 className="mb-8 text-center text-4xl font-bold text-blue-600">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="mb-2 block font-medium">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full rounded-xl border p-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full rounded-xl border p-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border p-3 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select Category</option>
              <option>Electronics</option>
              <option>Books</option>
              <option>Fashion</option>
              <option>Furniture</option>
              <option>Sports</option>
              <option>Others</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Condition
            </label>

            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full rounded-xl border p-3 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select Condition</option>
              <option>New</option>
              <option>Like New</option>
              <option>Used</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Description
            </label>

            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write about your product..."
              className="w-full rounded-xl border p-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
          >
            Add Product
          </button>

        </form>

      </div>
    </div>
  );
}

export default AddProduct;