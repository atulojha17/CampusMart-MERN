import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">

        <div>
          <h2 className="text-2xl font-bold text-blue-600">
            CampusMart
          </h2>

          <p className="mt-2 text-gray-500">
            Buy & Sell Within Your Campus.
          </p>
        </div>

        <div className="flex gap-6">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link to="/" className="hover:text-blue-600">
            Categories
          </Link>

          <Link to="/login" className="hover:text-blue-600">
            Login
          </Link>
        </div>

        <div className="flex gap-5">
          <span className="cursor-pointer hover:text-blue-600">GitHub</span>
          <span className="cursor-pointer hover:text-blue-600">LinkedIn</span>
          <span className="cursor-pointer hover:text-pink-500">Instagram</span>
        </div>

      </div>

      <div className="border-t py-4 text-center text-sm text-gray-500">
        © 2026 CampusMart. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;