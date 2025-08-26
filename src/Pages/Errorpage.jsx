import { Link } from 'react-router-dom';

const Errorpage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 relative px-4">


      {/* Error Content */}
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Oops! Page not found.</p>

      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default Errorpage;
