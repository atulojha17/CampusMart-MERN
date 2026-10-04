import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      <div className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 text-center">

        {/* Badge */}
        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
          🚀 Campus Marketplace
        </span>

        {/* Heading */}
        <h1 className="mt-6 max-w-4xl text-5xl font-extrabold leading-tight text-gray-900 md:text-7xl">
          Buy & Sell
          <span className="text-blue-600">
            {" "}Within Your Campus
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          Discover books, electronics, bikes, notes and accessories
          from students around you.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

          {/* Explore Products */}
          <Link to="/products">
            <Button
              size="lg"
              className="w-full bg-blue-600 px-8 hover:bg-blue-700 sm:w-auto"
            >
              Explore Products →
            </Button>
          </Link>

          {/* Sell Product */}
          <Link to="/add-product">
            <Button
              variant="outline"
              size="lg"
              className="w-full px-8 sm:w-auto"
            >
              Sell Product
            </Button>
          </Link>

        </div>

        {/* Small Stats */}
        <div className="mt-14 flex flex-wrap justify-center gap-8 text-sm text-gray-500">

          <div>
            <span className="block text-2xl font-bold text-gray-800">
              🛍️
            </span>
            Student Marketplace
          </div>

          <div>
            <span className="block text-2xl font-bold text-gray-800">
              🔐
            </span>
            Secure Login
          </div>

          <div>
            <span className="block text-2xl font-bold text-gray-800">
              ❤️
            </span>
            Wishlist
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;