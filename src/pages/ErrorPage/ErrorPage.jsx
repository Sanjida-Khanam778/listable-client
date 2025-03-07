import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-center">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-white">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
        Oops! The page you're looking for doesn&apos;t exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-primary-dark text-white rounded-lg shadow-md transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
