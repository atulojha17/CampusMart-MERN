import { Button } from "../ui/button";

function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      <div className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 text-center">

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
          🚀 Campus Marketplace
        </span>

        <h1 className="mt-6 max-w-4xl text-5xl font-extrabold leading-tight md:text-7xl">
          Buy & Sell
          <span className="text-blue-600"> Within Your Campus</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-600">
          Discover books, electronics, bikes, notes and accessories
          from students around you.
        </p>

        <div className="mt-10 flex gap-4">
          <Button size="lg">
            Explore Products
          </Button>

          <Button variant="outline" size="lg">
            Sell Product
          </Button>
        </div>

      </div>
    </section>
  );
}

export default Hero;