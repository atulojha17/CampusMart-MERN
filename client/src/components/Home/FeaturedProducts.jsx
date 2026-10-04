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
  const [loading, setLoading] = useState(true);

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    try {
      const response = await api.get("/product/all");

      const latestProducts = [...response.data.products]
        .sort(
          (a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        )
        .slice(0, 4);

      setProducts(latestProducts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* ================= HEADING ================= */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Featured Products
          </h2>

          <p className="mt-3 text-gray-500">
            Discover the latest products listed by students.
          </p>
        </div>

        {/* ================= LOADING ================= */}
        {loading ? (
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-[420px] animate-pulse rounded-2xl bg-white shadow-md"
              />
            ))}
          </div>
        ) : products.length === 0 ? (

          /* ================= NO PRODUCTS ================= */
          <div className="mt-12 rounded-2xl bg-white px-6 py-16 text-center shadow-md">
            <div className="text-5xl">🛍️</div>

            <h3 className="mt-4 text-2xl font-semibold text-gray-800">
              No Products Available
            </h3>

            <p className="mt-2 text-gray-500">
              Be the first student to list a product!
            </p>

            <Link to="/add-product">
              <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                Sell a Product
              </Button>
            </Link>
          </div>

        ) : (

          /* ================= PRODUCT GRID ================= */
          <>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

              {products.map((product) => (
                <Card
                  key={product._id}
                  className="group overflow-hidden rounded-2xl border-0 bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >

                  {/* ================= IMAGE ================= */}
                  <div className="relative overflow-hidden">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    {/* Category Badge */}
                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-blue-600 shadow">
                      {product.category}
                    </span>

                  </div>

                  {/* ================= CONTENT ================= */}
                  <CardContent className="pt-6">

                    <h3 className="truncate text-xl font-bold text-gray-800">
                      {product.name}
                    </h3>

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

                  </CardContent>

                  {/* ================= FOOTER ================= */}
                  <CardFooter>
                    <Link
                      to={`/product/${product._id}`}
                      className="w-full"
                    >
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        View Product →
                      </Button>
                    </Link>
                  </CardFooter>

                </Card>
              ))}

            </div>

            {/* ================= VIEW ALL ================= */}
            <div className="mt-12 text-center">
              <Link to="/products">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8"
                >
                  View All Products →
                </Button>
              </Link>
            </div>
          </>
        )}

      </div>
    </section>
  );
}

export default FeaturedProducts;