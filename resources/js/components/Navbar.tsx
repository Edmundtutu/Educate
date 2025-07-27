import React, { useEffect } from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
// If you get an error for lucide-react, install it with: npm install lucide-react
import { LogOut, Home, Book, Upload, Users, GraduationCap, Settings } from 'lucide-react';

function Navbar() {
  const { auth } = (usePage() as any).props;
  const user = auth?.user;
  // If you have school info in shared props, get it here as well

  useEffect(() => {
    if (!auth || !auth.user) {
      Inertia.visit('/login');
    }
  }, [auth]);

  const handleLogout = () => {
    Inertia.post('/logout');
  };

  const getRoleNavItems = () => {
    if (!user) return [];

    const items = [
      { to: '/dashboard', label: 'Dashboard', icon: Home }
    ];

    switch (user.role) {
      case 'super_admin':
        items.push(
          { to: '/schools', label: 'Schools', icon: GraduationCap },
          { to: '/admin/create-school', label: 'Create School', icon: Settings },
          { to: '/admin/create-user', label: 'Create User', icon: Users }
        );
        break;
      case 'school_admin':
        items.push(
          { to: '/courses', label: 'Courses', icon: Book },
          { to: '/materials', label: 'Materials', icon: Upload },
          { to: '/admin/create-user', label: 'Create User', icon: Users }
        );
        break;
      case 'teacher':
        items.push(
          { to: '/courses', label: 'My Courses', icon: Book },
          { to: '/materials/upload', label: 'Upload Material', icon: Upload }
        );
        break;
      case 'student':
        items.push(
          { to: '/courses', label: 'Courses', icon: Book },
          { to: '/materials', label: 'Materials', icon: Upload }
        );
        break;
    }

    return items;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">EduManage</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {getRoleNavItems().map((item) => (
              <Link
                key={item.to}
                href={item.to}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}

            <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
              <div className="text-sm">
                <p className="font-medium text-gray-900">{user?.name}</p>
                <p className="text-gray-500 capitalize">{user?.role.replace('_', ' ')}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
