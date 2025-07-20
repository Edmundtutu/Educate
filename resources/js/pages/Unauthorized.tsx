import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import { AlertCircle, Home } from 'lucide-react';

function Unauthorized() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-md p-8">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page. Please contact your administrator if you believe this is an error.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <Home className="h-4 w-4 mr-2" />
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;