import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Layout/Navbar";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // ================= GET MY PRODUCTS =================
  const fetchMyProducts = async () => {
    try {
      const response = await api.get("/product/my-products");

      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  // ================= DELETE PRODUCT =================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(id);

      const response = await api.delete(`/product/delete/${id}`);

      alert(response.data.message);

      // Remove deleted product from screen
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to delete product"
      );

      console.log(error);
    } finally {
      setDeletingId(null);
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
              Loading your products...
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

          <h1 className="text-center text-4xl font-bold text-blue-600">
            My Products
          </h1>

          <p className="mt-3 text-center text-gray-500">
            Products you have listed on CampusMart
          </p>

          {products.length === 0 ? (
            <div className="mt-12 rounded-2xl bg-white p-12 text-center shadow">

              <h2 className="text-2xl font-semibold text-gray-700">
                No Products Found
              </h2>

              <p className="mt-3 text-gray-500">
                You haven't added any products yet.
              </p>

              <Link
                to="/add-product"
                className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Sell a Product
              </Link>

            </div>
          ) : (
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {products.map((product) => (
                <div
                  key={product._id}
                  className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* Product Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-56 w-full object-cover"
                  />

                  <div className="p-5">

                    {/* Product Name */}
                    <h2 className="text-xl font-bold text-gray-800">
                      {product.name}
                    </h2>

                    {/* Price */}
                    <p className="mt-2 text-2xl font-bold text-blue-600">
                      ₹{product.price}
                    </p>

                    {/* Category */}
                    <p className="mt-2 text-sm text-gray-500">
                      Category: {product.category}
                    </p>

                    {/* Condition */}
                    <p className="mt-1 text-sm font-medium text-green-600">
                      Condition: {product.condition}
                    </p>

                    {/* Description */}
                    <p className="mt-3 line-clamp-2 text-sm text-gray-600">
                      {product.description}
                    </p>

                    {/* Buttons */}
                    <div className="mt-5 grid grid-cols-2 gap-3">

                      {/* View */}
                      <Link
                        to={`/product/${product._id}`}
                        className="rounded-lg bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                      >
                        View
                      </Link>

                      {/* Edit */}
                      <Link
                        to={`/edit-product/${product._id}`}
                        className="rounded-lg bg-yellow-500 py-3 text-center font-semibold text-white transition hover:bg-yellow-600"
                      >
                        Edit
                      </Link>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(product._id)}
                        disabled={deletingId === product._id}
                        className="col-span-2 rounded-lg bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingId === product._id
                          ? "Deleting..."
                          : "Delete"}
                      </button>

                    </div>

                  </div>
                </div>
              ))}

            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default MyProducts;