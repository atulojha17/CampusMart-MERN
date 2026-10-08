import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="text-center">

        <p className="text-7xl font-bold text-blue-600">
          404
        </p>

        <h1 className="mt-4 text-3xl font-bold text-gray-900">
          Page Not Found
        </h1>

        <p className="mt-3 text-gray-600">
          Sorry, the page you are looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Go Back Home
        </Link>

      </div>
    </div>
  );
}

export default NotFound;