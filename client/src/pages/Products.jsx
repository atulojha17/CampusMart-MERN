import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Layout/Navbar";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await api.get("/product/all");
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= FILTER PRODUCTS =================
  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  // ================= SORT PRODUCTS =================
  if (sort === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (sort === "newest") {
    filteredProducts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  // ================= CLEAR FILTERS =================
  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setSort("");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 px-6 py-12">
        <div className="mx-auto max-w-7xl">

          {/* ================= HEADING ================= */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-600">
              Browse Products
            </h1>

            <p className="mt-3 text-gray-500">
              Find products listed by students on CampusMart.
            </p>
          </div>

          {/* ================= FILTER SECTION ================= */}
          <div className="mt-10 rounded-2xl bg-white p-6 shadow-md">

            <div className="grid gap-4 md:grid-cols-4">

              {/* SEARCH */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Search
                </label>

                <input
                  type="text"
                  placeholder="🔍 Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">All Categories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Books">Books</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Sports">Sports</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* SORT */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Sort Products
                </label>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Default</option>

                  <option value="newest">
                    Newest First
                  </option>

                  <option value="low-high">
                    Price: Low to High
                  </option>

                  <option value="high-low">
                    Price: High to Low
                  </option>
                </select>
              </div>

              {/* CLEAR */}
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full rounded-xl bg-gray-800 px-5 py-3 font-semibold text-white transition hover:bg-gray-900"
                >
                  Clear Filters
                </button>
              </div>

            </div>
          </div>

          {/* ================= RESULT COUNT ================= */}
          <div className="mt-8 flex items-center justify-between">

            <p className="text-gray-600">
              Showing{" "}
              <span className="font-bold text-gray-800">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>

            {(search || category || sort) && (
              <button
                onClick={clearFilters}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Reset filters
              </button>
            )}

          </div>

          {/* ================= NO PRODUCTS ================= */}
          {filteredProducts.length === 0 ? (
            <div className="mt-10 rounded-2xl bg-white p-12 text-center shadow">

              <div className="text-5xl">
                🔍
              </div>

              <h2 className="mt-4 text-2xl font-semibold text-gray-700">
                No Products Found
              </h2>

              <p className="mt-3 text-gray-500">
                Try changing your search or filters.
              </p>

              <button
                onClick={clearFilters}
                className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Clear Filters
              </button>

            </div>
          ) : (

            /* ================= PRODUCTS ================= */
            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* IMAGE */}
                  <div className="relative">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-56 w-full object-cover"
                    />

                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-600 shadow">
                      {product.category}
                    </span>

                  </div>

                  {/* CONTENT */}
                  <div className="p-5">

                    <h2 className="truncate text-xl font-bold text-gray-800">
                      {product.name}
                    </h2>

                    <p className="mt-2 text-2xl font-bold text-blue-600">
                      ₹{product.price}
                    </p>

                    <p className="mt-2 text-sm font-medium text-green-600">
                      Condition: {product.condition}
                    </p>

                    <p className="mt-3 line-clamp-2 text-sm text-gray-600">
                      {product.description}
                    </p>

                    <Link
                      to={`/product/${product._id}`}
                      className="mt-5 block w-full rounded-lg bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                    >
                      View Product
                    </Link>

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

export default Products;