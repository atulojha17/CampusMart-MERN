import { Card, CardContent } from "../ui/card";
import {
  BookOpen,
  Laptop,
  Shirt,
  Sofa,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Books",
    icon: BookOpen,
  },
  {
    title: "Electronics",
    icon: Laptop,
  },
  {
    title: "Fashion",
    icon: Shirt,
  },
  {
    title: "Furniture",
    icon: Sofa,
  },
];

function Categories() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <h2 className="text-center text-4xl font-bold text-gray-900">
          Browse Categories
        </h2>

        <p className="mt-3 text-center text-gray-500">
          Find everything students need in one place.
        </p>

        {/* Categories */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Card
                key={category.title}
                onClick={() =>
                  handleCategoryClick(category.title)
                }
                className="cursor-pointer border-0 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <CardContent className="flex flex-col items-center py-10">

                  {/* Icon */}
                  <div className="rounded-2xl bg-blue-50 p-5">
                    <Icon
                      size={42}
                      className="text-blue-600"
                    />
                  </div>

                  {/* Category Name */}
                  <h3 className="mt-5 text-xl font-semibold text-gray-800">
                    {category.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Explore {category.title}
                  </p>

                </CardContent>
              </Card>
            );
          })}

        </div>
      </div>
    </section>
  );
}

export default Categories;