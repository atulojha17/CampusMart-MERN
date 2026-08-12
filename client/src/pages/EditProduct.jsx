import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Layout/Navbar";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    condition: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ================= GET PRODUCT =================
  const fetchProduct = async () => {
    try {
      const response = await api.get(`/product/${id}`);

      const product = response.data.product;

      setFormData({
        name: product.name,
        price: product.price,
        category: product.category,
        condition: product.condition,
        description: product.description,
      });
    } catch (error) {
      alert(
        error.response?.data?.message || "Unable to load product"
      );
      navigate("/my-products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= UPDATE PRODUCT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      const response = await api.put(
        `/product/update/${id}`,
        formData
      );

      alert(response.data.message);

      navigate("/my-products");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to update product"
      );

      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <>
        <Navbar />

        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

            <p className="mt-4 text-gray-600">
              Loading Product...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 px-6 py-10">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-xl">

          <h1 className="mb-8 text-center text-4xl font-bold text-blue-600">
            Edit Product
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Product Name */}
            <div>
              <label className="mb-2 block font-medium">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border p-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Price */}
            <div>
              <label className="mb-2 block font-medium">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full rounded-xl border p-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Category */}
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
                <option value="">
                  Select Category
                </option>

                <option>Electronics</option>
                <option>Books</option>
                <option>Fashion</option>
                <option>Furniture</option>
                <option>Sports</option>
                <option>Others</option>
              </select>
            </div>

            {/* Condition */}
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
                <option value="">
                  Select Condition
                </option>

                <option>New</option>
                <option>Like New</option>
                <option>Used</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block font-medium">
                Description
              </label>

              <textarea
                rows="5"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-xl border p-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Update Button */}
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Updating..." : "Update Product"}
            </button>

          </form>

        </div>
      </div>
    </>
  );
}

export default EditProduct;