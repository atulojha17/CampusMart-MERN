import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Layout/Navbar";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/product/${id}`);
      setProduct(response.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
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

      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-12">

          {/* Back Button */}
          <Link
            to="/products"
            className="mb-8 inline-flex items-center font-medium text-blue-600 hover:underline"
          >
            ← Back to Products
          </Link>

          {/* Product Section */}
          <div className="grid gap-10 rounded-2xl bg-white p-6 shadow-lg md:grid-cols-2 md:p-10">

            {/* Product Image */}
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="h-[450px] w-full rounded-2xl object-cover shadow-md"
              />
            </div>

            {/* Product Details */}
            <div>

              <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
                {product.category}
              </span>

              <h1 className="mt-4 text-4xl font-bold text-gray-900">
                {product.name}
              </h1>

              <p className="mt-4 text-3xl font-bold text-blue-600">
                ₹{product.price}
              </p>

              <p className="mt-6 leading-7 text-gray-600">
                {product.description}
              </p>

              {/* Product Information */}
              <div className="mt-8 rounded-xl bg-gray-50 p-5">

                <h2 className="text-xl font-semibold text-gray-800">
                  Product Information
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
                    <span className="font-medium text-green-600">
                      {product.condition}
                    </span>
                  </p>

                </div>
              </div>

              {/* Seller Information */}
              <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">

                <h2 className="text-xl font-semibold text-gray-800">
                  👤 Seller Information
                </h2>

                {product.owner ? (
                  <div className="mt-4 space-y-3">

                    <p className="text-gray-700">
                      <strong>Seller:</strong>{" "}
                      {product.owner.name}
                    </p>

                    <p className="text-gray-700">
                      <strong>Email:</strong>{" "}
                      {product.owner.email}
                    </p>

                    {product.owner.phone && (
                      <p className="text-gray-700">
                        <strong>Phone:</strong>{" "}
                        {product.owner.phone}
                      </p>
                    )}

                    {/* Contact Seller */}
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">

                      <a
                        href={`mailto:${product.owner.email}`}
                        className="flex-1 rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                      >
                        📧 Contact Seller
                      </a>

                      {product.owner.phone && (
                        <a
                          href={`tel:${product.owner.phone}`}
                          className="flex-1 rounded-xl bg-green-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-green-700"
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