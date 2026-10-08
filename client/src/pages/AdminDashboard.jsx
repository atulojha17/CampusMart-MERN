import { useEffect, useState } from "react";
import Navbar from "../components/Layout/Navbar";
import api from "../services/api";

function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [deletingProduct, setDeletingProduct] = useState(null);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError("");

      const [usersRes, productsRes] = await Promise.all([
        api.get("/admin/users"),
        api.get("/admin/products"),
      ]);

      setTotalUsers(usersRes.data.totalUsers);
      setTotalProducts(productsRes.data.totalProducts);

      setUsers(usersRes.data.users);
      setProducts(productsRes.data.products);
    } catch (error) {
      console.error("Failed to fetch admin data:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load admin data. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingProduct(productId);

      await api.delete(`/admin/product/${productId}`);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );

      setTotalProducts((prev) => prev - 1);
    } catch (error) {
      console.error("Failed to delete product:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete product. Please try again."
      );
    } finally {
      setDeletingProduct(null);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-gray-600">
              Manage CampusMart users and products.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-medium text-red-700">
                  {error}
                </p>

                <button
                  onClick={fetchAdminData}
                  className="w-fit rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {/* Total Users */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Total Users
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                {loading ? "..." : totalUsers}
              </h2>
            </div>

            {/* Total Products */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Total Products
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                {loading ? "..." : totalProducts}
              </h2>
            </div>

            {/* Admin Status */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Admin Status
              </p>

              <h2 className="mt-2 text-xl font-bold text-green-600">
                Active
              </h2>
            </div>

          </div>

          {/* User Management */}
          <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                User Management
              </h2>

              <p className="mt-2 text-gray-600">
                View registered CampusMart users.
              </p>
            </div>

            {loading ? (
              <div className="py-8 text-center text-gray-500">
                Loading users...
              </div>
            ) : users.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No users found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left">

                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                        Name
                      </th>

                      <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                        Email
                      </th>

                      <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                        Phone
                      </th>

                      <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                        Role
                      </th>

                      <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                        Registered
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        className="border-b border-gray-100 last:border-b-0"
                      >
                        <td className="px-4 py-4 font-medium text-gray-900">
                          {user.name}
                        </td>

                        <td className="px-4 py-4 text-gray-600">
                          {user.email}
                        </td>

                        <td className="px-4 py-4 text-gray-600">
                          {user.phone || "—"}
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              user.role === "admin"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-gray-600">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            )}

          </div>

          {/* Product Management */}
          <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Product Management
              </h2>

              <p className="mt-2 text-gray-600">
                View and manage products listed on CampusMart.
              </p>
            </div>

            {loading ? (
              <div className="py-8 text-center text-gray-500">
                Loading products...
              </div>
            ) : products.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No products found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left">

                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                        Product
                      </th>

                      <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                        Price
                      </th>

                      <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                        Category
                      </th>

                      <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                        Condition
                      </th>

                      <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                        Seller
                      </th>

                      <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {products.map((product) => (
                      <tr
                        key={product._id}
                        className="border-b border-gray-100 last:border-b-0"
                      >
                        <td className="px-4 py-4 font-medium text-gray-900">
                          {product.name}
                        </td>

                        <td className="px-4 py-4 font-medium text-gray-900">
                          ₹{product.price}
                        </td>

                        <td className="px-4 py-4 text-gray-600">
                          {product.category}
                        </td>

                        <td className="px-4 py-4 text-gray-600">
                          {product.condition}
                        </td>

                        <td className="px-4 py-4">
                          <div>
                            <p className="font-medium text-gray-900">
                              {product.owner?.name || "Unknown"}
                            </p>

                            <p className="text-sm text-gray-500">
                              {product.owner?.email || "—"}
                            </p>
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <button
                            onClick={() =>
                              handleDeleteProduct(product._id)
                            }
                            disabled={deletingProduct === product._id}
                            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {deletingProduct === product._id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            )}

          </div>

        </div>
      </div>
    </>
  );
}

export default AdminDashboard;