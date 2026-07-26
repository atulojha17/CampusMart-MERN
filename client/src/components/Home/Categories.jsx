import { Card, CardContent } from "../ui/card";
import { BookOpen, Laptop, Bike, Backpack } from "lucide-react";

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
    title: "Bikes",
    icon: Bike,
  },
  {
    title: "Accessories",
    icon: Backpack,
  },
];

function Categories() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="text-center text-4xl font-bold">
          Browse Categories
        </h2>

        <p className="mt-3 text-center text-gray-500">
          Find everything students need in one place.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Card
                key={category.title}
                className="cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
              >
                <CardContent className="flex flex-col items-center py-10">

                  <Icon
                    size={42}
                    className="text-blue-600"
                  />

                  <h3 className="mt-4 text-xl font-semibold">
                    {category.title}
                  </h3>

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