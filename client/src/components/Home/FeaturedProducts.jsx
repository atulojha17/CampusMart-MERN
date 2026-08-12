import {
  Card,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // ================= FETCH PRODUCTS =================
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
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  // ================= CLEAR FILTERS =================
  const clearFilters = () => {
    setSearch("");
    setCategory("");
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <h2 className="text-center text-4xl font-bold">
          Featured Products
        </h2>

        <p className="mt-3 text-center text-gray-500">
          Trending products from students.
        </p>

        {/* ================= SEARCH & FILTER ================= */}
        <div className="mt-10 rounded-2xl bg-white p-6 shadow-md">

          <div className="grid gap-4 md:grid-cols-3">

            {/* Search */}
            <input
              type="text"
              placeholder="🔍 Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            />

            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="">
                All Categories
              </option>

              <option value="Electronics">
                Electronics
              </option>

              <option value="Books">
                Books
              </option>

              <option value="Fashion">
                Fashion
              </option>

              <option value="Furniture">
                Furniture
              </option>

              <option value="Sports">
                Sports
              </option>

              <option value="Others">
                Others
              </option>
            </select>

            {/* Clear */}
            <button
              onClick={clearFilters}
              className="rounded-xl bg-gray-800 px-5 py-3 font-semibold text-white transition hover:bg-gray-900"
            >
              Clear Filters
            </button>

          </div>

        </div>

        {/* ================= PRODUCT GRID ================= */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {filteredProducts.length === 0 ? (

            <div className="col-span-full py-16 text-center">

              <h3 className="text-2xl font-semibold text-gray-700">
                No Products Found
              </h3>

              <p className="mt-2 text-gray-500">
                Try changing your search or category.
              </p>

            </div>

          ) : (

            filteredProducts.map((product) => (

              <Card
                key={product._id}
                className="overflow-hidden transition hover:-translate-y-2 hover:shadow-xl"
              >

                {/* Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-56 w-full object-cover"
                />

                <CardContent className="pt-6">

                  {/* Name */}
                  <h3 className="text-xl font-semibold">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <p className="mt-2 font-bold text-blue-600">
                    ₹{product.price}
                  </p>

                  {/* Category */}
                  <p className="mt-2 text-sm text-gray-500">
                    {product.category}
                  </p>

                  {/* Condition */}
                  <p className="text-sm font-medium text-green-600">
                    {product.condition}
                  </p>

                </CardContent>

                <CardFooter>

                  <Link
                    to={`/product/${product._id}`}
                    className="w-full"
                  >
                    <Button className="w-full">
                      View Product
                    </Button>
                  </Link>

                </CardFooter>

              </Card>

            ))
          )}

        </div>

      </div>
    </section>
  );
}

export default FeaturedProducts;