import api from "../services/api";
import { useState } from "react";
import { ImagePlus, Package, IndianRupee } from "lucide-react";

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    condition: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });

    setServerError("");
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    setErrors({
      ...errors,
      image: "",
    });

    setServerError("");

    if (!selectedImage) {
      setImage(null);
      return;
    }

    if (!selectedImage.type.startsWith("image/")) {
      setImage(null);
      setErrors({
        ...errors,
        image: "Please select a valid image file",
      });
      return;
    }

    if (selectedImage.size > 5 * 1024 * 1024) {
      setImage(null);
      setErrors({
        ...errors,
        image: "Image size must be less than 5 MB",
      });
      return;
    }

    setImage(selectedImage);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Product name must be at least 2 characters";
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
      newErrors.condition = "Please select product condition";
    }

    if (!image) {
      newErrors.image = "Product image is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description =
        "Description must be at least 10 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const productData = new FormData();

      productData.append("name", formData.name.trim());
      productData.append("price", formData.price);
      productData.append("category", formData.category);
      productData.append("condition", formData.condition);
      productData.append(
        "description",
        formData.description.trim()
      );
      productData.append("image", image);

      const response = await api.post(
        "/product/create",
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(response.data.message);

      setFormData({
        name: "",
        price: "",
        category: "",
        condition: "",
        description: "",
      });

      setImage(null);
      setErrors({});
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
          "Unable to add product. Please try again."
      );

      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-xl sm:p-8">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
            <Package className="text-blue-600" size={28} />
          </div>

          <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
            Add New Product
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            List your product and sell it within your campus.
          </p>
        </div>

        {/* Server Error */}
        {serverError && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

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
              placeholder="e.g. Engineering Mathematics Book"
              className={`w-full rounded-xl border p-3 outline-none transition focus:ring-2 ${
                errors.name
                  ? "border-red-400 focus:ring-red-100"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />

            {errors.name && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.name}
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
                  errors.price
                    ? "border-red-400 focus:ring-red-100"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                }`}
              />
            </div>

            {errors.price && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.price}
              </p>
            )}
          </div>

          {/* Category & Condition */}
          <div className="grid gap-6 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full rounded-xl border p-3 outline-none transition focus:ring-2 ${
                  errors.category
                    ? "border-red-400 focus:ring-red-100"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                }`}
              >
                <option value="">Select Category</option>
                <option>Electronics</option>
                <option>Books</option>
                <option>Fashion</option>
                <option>Furniture</option>
                <option>Sports</option>
                <option>Others</option>
              </select>

              {errors.category && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.category}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Condition
              </label>

              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className={`w-full rounded-xl border p-3 outline-none transition focus:ring-2 ${
                  errors.condition
                    ? "border-red-400 focus:ring-red-100"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                }`}
              >
                <option value="">Select Condition</option>
                <option>New</option>
                <option>Like New</option>
                <option>Used</option>
              </select>

              {errors.condition && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.condition}
                </p>
              )}
            </div>

          </div>

          {/* Image */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Product Image
            </label>

            <label
              className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition ${
                errors.image
                  ? "border-red-400 bg-red-50"
                  : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50"
              }`}
            >
              <ImagePlus
                size={36}
                className="text-blue-500"
              />

              <span className="mt-3 text-sm font-semibold text-gray-700">
                {image
                  ? image.name
                  : "Click to upload product image"}
              </span>

              <span className="mt-1 text-xs text-gray-500">
                JPG, PNG or WEBP • Maximum 5 MB
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {errors.image && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.image}
              </p>
            )}

            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Product Preview"
                className="mt-4 h-56 w-full rounded-xl object-cover shadow-md"
              />
            )}
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Description
            </label>

            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your product, its features, usage, etc."
              className={`w-full resize-none rounded-xl border p-3 outline-none transition focus:ring-2 ${
                errors.description
                  ? "border-red-400 focus:ring-red-100"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />

            <div className="mt-1 flex justify-between">
              {errors.description ? (
                <p className="text-sm text-red-500">
                  {errors.description}
                </p>
              ) : (
                <span />
              )}

              <span className="text-xs text-gray-400">
                {formData.description.length} characters
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Adding Product..."
              : "Add Product"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddProduct;