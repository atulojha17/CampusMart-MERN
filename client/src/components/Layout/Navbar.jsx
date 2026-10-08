import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="text-2xl font-bold text-blue-600"
        >
          CampusMart
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <Link
            to="/"
            className="text-gray-700 transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="text-gray-700 transition hover:text-blue-600"
          >
            Browse Products
          </Link>

          <Link
            to="/add-product"
            className="text-gray-700 transition hover:text-blue-600"
          >
            Sell Product
          </Link>

          {user && (
            <Link
              to="/my-products"
              className="text-gray-700 transition hover:text-blue-600"
            >
              My Products
            </Link>
          )}

          {user && (
            <Link
              to="/wishlist"
              className="text-gray-700 transition hover:text-blue-600"
            >
              ❤️ Wishlist
            </Link>
          )}

          {/* Admin Dashboard */}
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="font-medium text-blue-600 transition hover:text-blue-700"
            >
              🛡️ Admin
            </Link>
          )}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-4 md:flex">

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
                className="text-gray-700 transition hover:text-blue-600"
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t bg-white px-4 py-4 shadow-md md:hidden">

          <div className="flex flex-col gap-1">

            <Link
              to="/"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              to="/products"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
            >
              Browse Products
            </Link>

            <Link
              to="/add-product"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
            >
              Sell Product
            </Link>

            {user && (
              <Link
                to="/my-products"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
              >
                My Products
              </Link>
            )}

            {user && (
              <Link
                to="/wishlist"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
              >
                ❤️ Wishlist
              </Link>
            )}

            {/* Admin Dashboard */}
            {user?.role === "admin" && (
              <Link
                to="/admin"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 font-medium text-blue-600 transition hover:bg-blue-50"
              >
                🛡️ Admin Dashboard
              </Link>
            )}

            <div className="my-2 border-t" />

            {user ? (
              <>
                <div className="px-3 py-2 font-medium text-gray-700">
                  👋 {user.name}
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full rounded-lg bg-red-500 px-4 py-3 text-white transition hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-3 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="rounded-lg bg-blue-600 px-4 py-3 text-center text-white transition hover:bg-blue-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;