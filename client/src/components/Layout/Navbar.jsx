import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          CampusMart
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <Link
            to="/"
            className="text-gray-700 transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/"
            className="text-gray-700 transition hover:text-blue-600"
          >
            Categories
          </Link>

          {/* Sell Product */}
          <Link
            to="/add-product"
            className="text-gray-700 transition hover:text-blue-600"
          >
            Sell Product
          </Link>

          {/* My Products */}
          {user && (
            <Link
              to="/my-products"
              className="text-gray-700 transition hover:text-blue-600"
            >
              My Products
            </Link>
          )}

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {user ? (
            <>
              <span className="font-medium text-gray-700">
                👋 {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;