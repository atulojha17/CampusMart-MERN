import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          CampusMart
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">

          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Home
          </Link>

          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Categories
          </Link>

          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Sell Product
          </Link>

        </div>

        {/* Right Side */}

        <div className="flex items-center gap-3">

          <Link
            to="/login"
            className="text-gray-700 hover:text-blue-600"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition"
          >
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;