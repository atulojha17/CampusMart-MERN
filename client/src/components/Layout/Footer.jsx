import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        
        {/* Brand */}
        <div>
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-700"
          >
            CampusMart
          </Link>

          <p className="mt-2 text-gray-500">
            Buy & Sell Within Your Campus.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex gap-6">
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
            Categories
          </Link>

          <Link
            to="/login"
            className="text-gray-700 transition hover:text-blue-600"
          >
            Login
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex gap-5">
          <a
            href="https://github.com/atulojha17/CampusMart-MERN"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 transition hover:text-blue-600"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 transition hover:text-blue-600"
          >
            LinkedIn
          </a>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 transition hover:text-pink-500"
          >
            Instagram
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t py-4 text-center text-sm text-gray-500">
        © 2026 CampusMart. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;