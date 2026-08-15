import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Layout/Navbar";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/product/${id}`);

      setProduct(response.data.product);
    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
          "Unable to load product"
      );
    } finally {
      setLoading(false);
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

            <p className="mt-4 text-gray-600">
              Loading Product...
            </p>
          </div>
        </div>
      </>
    );
  }

  // ================= ERROR =================
  if (error || !product) {
    return (
      <>
        <Navbar />

        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
          <div className="rounded-2xl bg-white p-10 text-center shadow-lg">
            <div className="text-5xl">😕</div>

            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              Product Not Found
            </h2>

            <p className="mt-2 text-gray-500">
              {error || "This product may have been removed."}
            </p>

            <Link
              to="/products"
              className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              ← Browse Products
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-12">

          {/* ================= BACK BUTTON ================= */}
          <Link
            to="/products"
            className="mb-8 inline-flex items-center font-medium text-blue-600 transition hover:text-blue-800 hover:underline"
          >
            ← Back to Products
          </Link>

          {/* ================= PRODUCT CARD ================= */}
          <div className="grid gap-10 rounded-2xl bg-white p-6 shadow-lg md:grid-cols-2 md:p-10">

            {/* ================= PRODUCT IMAGE ================= */}
            <div className="flex h-[450px] items-center justify-center overflow-hidden rounded-2xl bg-gray-50 shadow-md">

              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain p-4"
              />

            </div>

            {/* ================= PRODUCT DETAILS ================= */}
            <div>

              {/* Category */}
              <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-600">
                {product.category}
              </span>

              {/* Product Name */}
              <h1 className="mt-4 text-4xl font-bold text-gray-900">
                {product.name}
              </h1>

              {/* Price */}
              <p className="mt-4 text-3xl font-bold text-blue-600">
                ₹{product.price}
              </p>

              {/* Description */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800">
                  Description
                </h2>

                <p className="mt-2 leading-7 text-gray-600">
                  {product.description}
                </p>
              </div>

              {/* ================= PRODUCT INFORMATION ================= */}
              <div className="mt-8 rounded-xl bg-gray-50 p-5">

                <h2 className="text-xl font-semibold text-gray-800">
                  📦 Product Information
                </h2>

                <div className="mt-4 space-y-3 text-gray-600">

                  <p>
                    <strong className="text-gray-800">
                      Category:
                    </strong>{" "}
                    {product.category}
                  </p>

                  <p>
                    <strong className="text-gray-800">
                      Condition:
                    </strong>{" "}
                    <span className="font-semibold text-green-600">
                      {product.condition}
                    </span>
                  </p>

                </div>
              </div>

              {/* ================= SELLER INFORMATION ================= */}
              <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">

                <h2 className="text-xl font-semibold text-gray-800">
                  👤 Seller Information
                </h2>

                {product.owner ? (
                  <div className="mt-4 space-y-3">

                    {/* Seller Name */}
                    <p className="text-gray-700">
                      <strong className="text-gray-900">
                        Seller:
                      </strong>{" "}
                      {product.owner.name}
                    </p>

                    {/* Email */}
                    <p className="text-gray-700">
                      <strong className="text-gray-900">
                        Email:
                      </strong>{" "}
                      {product.owner.email}
                    </p>

                    {/* Phone */}
                    {product.owner.phone && (
                      <p className="text-gray-700">
                        <strong className="text-gray-900">
                          Phone:
                        </strong>{" "}
                        {product.owner.phone}
                      </p>
                    )}

                    {/* ================= CONTACT BUTTONS ================= */}
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">

                      {/* Email */}
                      <a
                        href={`mailto:${product.owner.email}?subject=Interested in ${product.name}&body=Hi ${product.owner.name},%0D%0A%0D%0AI am interested in your CampusMart listing: ${product.name}.`}
                        className="rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                      >
                        📧 Contact Seller
                      </a>

                      {/* Phone */}
                      {product.owner.phone && (
                        <a
                          href={`tel:${product.owner.phone}`}
                          className="rounded-xl bg-green-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-green-700"
                        >
                          📞 Call Seller
                        </a>
                      )}

                    </div>

                  </div>
                ) : (
                  <p className="mt-3 text-gray-500">
                    Seller information is not available.
                  </p>
                )}

              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default ProductDetails;