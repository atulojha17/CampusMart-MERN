import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Layout/Navbar";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

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
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

          <p className="mt-4 text-gray-600">
            Loading Product...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="mx-auto max-w-5xl px-6 py-12">

        <Link
          to="/"
          className="mb-6 inline-block text-blue-600 hover:underline"
        >
          ← Back to Home
        </Link>

        <div className="grid gap-10 md:grid-cols-2">

          <img
            src="https://placehold.co/600x450"
            alt={product.name}
            className="rounded-xl shadow-lg"
          />

          <div>

            <h1 className="text-4xl font-bold">
              {product.name}
            </h1>

            <p className="mt-4 text-3xl font-bold text-blue-600">
              ₹{product.price}
            </p>

            <p className="mt-6 text-gray-600 leading-7">
              {product.description}
            </p>

            <div className="mt-8 rounded-xl bg-gray-100 p-5">

              <h3 className="text-lg font-semibold">
                Product Information
              </h3>

              <div className="mt-4 space-y-3">

                <p>
                  <strong>Category:</strong> {product.category}
                </p>

                <p>
                  <strong>Condition:</strong> {product.condition}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default ProductDetails;