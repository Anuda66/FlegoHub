import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="ml-64 mt-16 p-6 flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-6">The page you are looking for doesn't exist or has been moved.</p>
        <Link 
          to="/" 
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Error;