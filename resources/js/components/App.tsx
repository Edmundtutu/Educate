import React from 'react';

// This component can be used as a layout wrapper for Inertia pages if needed.
// Add any shared layout (e.g., Navbar, Footer) here.

type AppProps = {
  children?: any;
};

function App({ children }: AppProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Add shared layout components here, e.g., Navbar */}
      {children}
    </div>
  );
}

export default App;