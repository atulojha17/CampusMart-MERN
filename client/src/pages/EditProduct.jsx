import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Layout/Navbar";
import { Package, IndianRupee } from "lucide-react";

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
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  // ================= GET PRODUCT =================
  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/product/${id}`);

      const product = response.data.product;

      setFormData({
        name: product.name || "",
        price: product.price || "",
        category: product.category || "",
        condition: product.condition || "",
        description: product.description || "",
      });
    } catch (error) {
      console.log(error);

      const message =
        error.response?.data?.message ||
        "Unable to load product";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setValidationErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));

    setError("");
  };

  // ================= VALIDATION =================
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name =
        "Product name must be at least 2 characters";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (Number(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.condition) {
      newErrors.condition =
        "Please select product condition";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description =
        "Description must be at least 10 characters";
    }

    setValidationErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ================= UPDATE PRODUCT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      const response = await api.put(
        `/product/update/${id}`,
        {
          name: formData.name.trim(),
          price: Number(formData.price),
          category: formData.category,
          condition: formData.condition,
          description: formData.description.trim(),
        }
      );

      alert(
        response.data.message ||
          "Product Updated Successfully"
      );

      navigate("/my-products");
    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
          "Unable to update product"
      );
    } finally {
      setSaving(false);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <>
        <Navbar />

        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

            <p className="mt-4 font-medium text-gray-600">
              Loading Product...
            </p>
          </div>
        </div>
      </>
    );
  }

  // ================= ERROR =================
  if (error && !formData.name) {
    return (
      <>
        <Navbar />

        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
          <div className="rounded-2xl bg-white p-10 text-center shadow-lg">
            <div className="text-5xl">⚠️</div>

            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              Unable to Load Product
            </h2>

            <p className="mt-3 text-gray-500">
              {error}
            </p>

            <Link
              to="/my-products"
              className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              ← Back to My Products
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 py-10">
        <div className="mx-auto max-w-3xl">

          {/* Back */}
          <Link
            to="/my-products"
            className="mb-6 inline-flex font-medium text-blue-600 hover:underline"
          >
            ← Back to My Products
          </Link>

          {/* Form Card */}
          <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">

            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                <Package
                  className="text-blue-600"
                  size={28}
                />
              </div>

              <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
                Edit Product
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Update your product information
              </p>
            </div>

            {/* Update Error */}
            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* Product Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 ${
                    validationErrors.name
                      ? "border-red-400 focus:ring-red-100"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />

                {validationErrors.name && (
                  <p className="mt-1.5 text-sm text-red-500">
                    {validationErrors.name}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Price
                </label>

                <div className="relative">
                  <IndianRupee
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="number"
                    name="price"
                    min="1"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    className={`w-full rounded-xl border py-3 pl-10 pr-4 outline-none transition focus:ring-2 ${
                      validationErrors.price
                        ? "border-red-400 focus:ring-red-100"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  />
                </div>

                {validationErrors.price && (
                  <p className="mt-1.5 text-sm text-red-500">
                    {validationErrors.price}
                  </p>
                )}
              </div>

              {/* Category & Condition */}
              <div className="grid gap-6 sm:grid-cols-2">

                {/* Category */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full rounded-xl border p-3 outline-none transition focus:ring-2 ${
                      validationErrors.category
                        ? "border-red-400 focus:ring-red-100"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  >
                    <option value="">
                      Select Category
                    </option>
                    <option value="Electronics">
                      Electronics
                    </option>
                    <option value="Books">Books</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Furniture">
                      Furniture
                    </option>
                    <option value="Sports">Sports</option>
                    <option value="Others">Others</option>
                  </select>

                  {validationErrors.category && (
                    <p className="mt-1.5 text-sm text-red-500">
                      {validationErrors.category}
                    </p>
                  )}
                </div>

                {/* Condition */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Condition
                  </label>

                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className={`w-full rounded-xl border p-3 outline-none transition focus:ring-2 ${
                      validationErrors.condition
                        ? "border-red-400 focus:ring-red-100"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  >
                    <option value="">
                      Select Condition
                    </option>
                    <option value="New">New</option>
                    <option value="Like New">
                      Like New
                    </option>
                    <option value="Used">Used</option>
                  </select>

                  {validationErrors.condition && (
                    <p className="mt-1.5 text-sm text-red-500">
                      {validationErrors.condition}
                    </p>
                  )}
                </div>

              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Description
                </label>

                <textarea
                  rows="6"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write about your product..."
                  className={`w-full resize-none rounded-xl border px-4 py-3 outline-none transition focus:ring-2 ${
                    validationErrors.description
                      ? "border-red-400 focus:ring-red-100"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />

                <div className="mt-1 flex justify-between">
                  {validationErrors.description ? (
                    <p className="text-sm text-red-500">
                      {validationErrors.description}
                    </p>
                  ) : (
                    <span />
                  )}

                  <span className="text-xs text-gray-400">
                    {formData.description.length} characters
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid gap-4 sm:grid-cols-2">

                <Link
                  to="/my-products"
                  className="rounded-xl border border-gray-300 py-4 text-center font-semibold text-gray-700 transition hover:bg-gray-100"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "Updating..."
                    : "Update Product"}
                </button>

              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProduct;