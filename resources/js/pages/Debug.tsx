import React from 'react';
import { usePage } from '@inertiajs/inertia-react';

const Debug: React.FC = () => {
  const { auth, user, session_school } = (usePage() as any).props;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Information</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Auth Object:</h2>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(auth, null, 2)}</pre>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold">User Object:</h2>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(user, null, 2)}</pre>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold">Session School ID:</h2>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(session_school, null, 2)}</pre>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold">All Props:</h2>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify((usePage() as any).props, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default Debug; 