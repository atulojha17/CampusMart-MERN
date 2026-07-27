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

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-4xl font-bold">
          Featured Products
        </h2>

        <p className="mt-3 text-center text-gray-500">
          Trending products from students.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {products.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No products available.
            </p>
          ) : (
            products.map((product) => (
              <Card
                key={product._id}
                className="overflow-hidden transition hover:-translate-y-2 hover:shadow-xl"
              >
                <img
                  src="https://placehold.co/400x300"
                  alt={product.name}
                  className="h-56 w-full object-cover"
                />

                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold">
                    {product.name}
                  </h3>

                  <p className="mt-2 font-bold text-blue-600">
                    ₹{product.price}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    {product.category}
                  </p>

                  <p className="text-sm font-medium text-green-600">
                    {product.condition}
                  </p>
                </CardContent>

                <CardFooter>
                  <Link to={`/product/${product._id}`} className="w-full">
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