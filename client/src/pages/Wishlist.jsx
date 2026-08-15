import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Layout/Navbar";

function Wishlist() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH WISHLIST =================
  const fetchWishlist = async () => {
    try {
      const response = await api.get("/wishlist/my-wishlist");

      setProducts(response.data.products || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // ================= REMOVE FROM WISHLIST =================
  const removeFromWishlist = async (productId) => {
    try {
      await api.delete(`/wishlist/remove/${productId}`);

      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) => product._id !== productId
        )
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to remove from wishlist"
      );

      console.log(error);
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
              Loading Wishlist...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 px-6 py-12">
        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-600">
              ❤️ My Wishlist
            </h1>

            <p className="mt-3 text-gray-500">
              Products you have saved for later.
            </p>
          </div>

          {/* Empty Wishlist */}
          {products.length === 0 ? (
            <div className="mt-12 rounded-2xl bg-white p-12 text-center shadow">

              <div className="text-6xl">
                💔
              </div>

              <h2 className="mt-5 text-2xl font-semibold text-gray-700">
                Your Wishlist is Empty
              </h2>

              <p className="mt-3 text-gray-500">
                You haven't added any products to your wishlist yet.
              </p>

              <Link
                to="/products"
                className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Browse Products
              </Link>

            </div>
          ) : (
            <>
              {/* Result Count */}
              <p className="mt-10 text-gray-600">
                You have{" "}
                <span className="font-semibold text-blue-600">
                  {products.length}
                </span>{" "}
                saved product
                {products.length !== 1 && "s"}.
              </p>

              {/* Products */}
              <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {products.map((product) => (
                  <div
                    key={product._id}
                    className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                  >

                    {/* Image */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-56 w-full object-cover"
                    />

                    {/* Details */}
                    <div className="p-5">

                      <h2 className="text-xl font-bold text-gray-800">
                        {product.name}
                      </h2>

                      <p className="mt-2 text-2xl font-bold text-blue-600">
                        ₹{product.price}
                      </p>

                      <p className="mt-2 text-sm text-gray-500">
                        Category: {product.category}
                      </p>

                      <p className="mt-1 text-sm font-medium text-green-600">
                        Condition: {product.condition}
                      </p>

                      <p className="mt-3 line-clamp-2 text-sm text-gray-600">
                        {product.description}
                      </p>

                      {/* Buttons */}
                      <div className="mt-5 flex gap-3">

                        <Link
                          to={`/product/${product._id}`}
                          className="flex-1 rounded-lg bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                        >
                          View
                        </Link>

                        <button
                          onClick={() =>
                            removeFromWishlist(product._id)
                          }
                          className="flex-1 rounded-lg bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
                        >
                          Remove
                        </button>

                      </div>

                    </div>
                  </div>
                ))}

              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}

export default Wishlist;