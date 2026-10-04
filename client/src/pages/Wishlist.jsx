import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Layout/Navbar";

function Wishlist() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

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
      setRemovingId(productId);

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
    } finally {
      setRemovingId(null);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <>
        <Navbar />

        <div className="flex min-h-screen items-center justify-center bg-gray-100">
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

          {/* ================= HEADER ================= */}
          <div className="text-center">
            <span className="inline-block rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
              ❤️ Saved Products
            </span>

            <h1 className="mt-5 text-4xl font-extrabold text-gray-900">
              My Wishlist
            </h1>

            <p className="mt-3 text-gray-500">
              Products you've saved for later.
            </p>
          </div>

          {/* ================= EMPTY WISHLIST ================= */}
          {products.length === 0 ? (
            <div className="mx-auto mt-12 max-w-2xl rounded-2xl bg-white p-12 text-center shadow-md">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-4xl">
                💔
              </div>

              <h2 className="mt-6 text-2xl font-bold text-gray-800">
                Your Wishlist is Empty
              </h2>

              <p className="mx-auto mt-3 max-w-md text-gray-500">
                You haven't saved any products yet.
                Browse CampusMart and add products you
                would like to check out later.
              </p>

              <Link
                to="/products"
                className="mt-7 inline-flex items-center rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Browse Products →
              </Link>
            </div>
          ) : (
            <>
              {/* ================= RESULT INFO ================= */}
              <div className="mt-10 flex items-center justify-between">
                <p className="text-gray-600">
                  <span className="font-bold text-gray-900">
                    {products.length}
                  </span>{" "}
                  saved product
                  {products.length !== 1 && "s"}
                </p>

                <Link
                  to="/products"
                  className="text-sm font-semibold text-blue-600 hover:underline"
                >
                  Browse More →
                </Link>
              </div>

              {/* ================= PRODUCT GRID ================= */}
              <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {products.map((product) => (
                  <div
                    key={product._id}
                    className="group overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                  >

                    {/* ================= IMAGE ================= */}
                    <div className="relative overflow-hidden">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      {/* Wishlist Badge */}
                      <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-lg shadow">
                        ❤️
                      </span>

                      {/* Category Badge */}
                      <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-blue-600 shadow">
                        {product.category}
                      </span>

                    </div>

                    {/* ================= CONTENT ================= */}
                    <div className="p-5">

                      <h2 className="truncate text-xl font-bold text-gray-800">
                        {product.name}
                      </h2>

                      <p className="mt-2 text-2xl font-bold text-blue-600">
                        ₹{product.price}
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Condition
                        </span>

                        <span className="text-sm font-semibold text-green-600">
                          {product.condition}
                        </span>
                      </div>

                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
                        {product.description}
                      </p>

                      {/* ================= BUTTONS ================= */}
                      <div className="mt-5 grid grid-cols-2 gap-3">

                        <Link
                          to={`/product/${product._id}`}
                          className="rounded-xl bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                        >
                          View Product
                        </Link>

                        <button
                          onClick={() =>
                            removeFromWishlist(product._id)
                          }
                          disabled={removingId === product._id}
                          className="rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {removingId === product._id
                            ? "Removing..."
                            : "Remove"}
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