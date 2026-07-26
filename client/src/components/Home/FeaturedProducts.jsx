import {
  Card,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";

const products = [
  {
    id: 1,
    name: "DSA Book",
    price: "₹499",
    image: "https://placehold.co/400x300",
  },
  {
    id: 2,
    name: "Scientific Calculator",
    price: "₹899",
    image: "https://placehold.co/400x300",
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: "₹799",
    image: "https://placehold.co/400x300",
  },
  {
    id: 4,
    name: "Bluetooth Headphones",
    price: "₹1499",
    image: "https://placehold.co/400x300",
  },
];

function FeaturedProducts() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Featured Products
        </h2>

        <p className="text-center text-gray-500 mt-3">
          Trending products from students.
        </p>

        <div className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-4">

          {products.map((product) => (

            <Card
              key={product.id}
              className="overflow-hidden transition hover:shadow-xl hover:-translate-y-2"
            >

              <img
                src={product.image}
                alt={product.name}
                className="h-56 w-full object-cover"
              />

              <CardContent className="pt-6">

                <h3 className="text-xl font-semibold">
                  {product.name}
                </h3>

                <p className="mt-2 text-blue-600 font-bold">
                  {product.price}
                </p>

              </CardContent>

              <CardFooter>

                <Button className="w-full">
                  View Product
                </Button>

              </CardFooter>

            </Card>

          ))}

        </div>

      </div>
    </section>
  );
}

export default FeaturedProducts;