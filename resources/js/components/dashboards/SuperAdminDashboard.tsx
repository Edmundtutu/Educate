import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import { Building2, Users, TrendingUp, Plus } from 'lucide-react';
import { usePage } from '@inertiajs/inertia-react';

function SuperAdminDashboard() {
  const { user, schools, users } = (usePage() as any).props;
  const totalSchools = schools.length;
  const totalUsers = users.length;
  const recentSchools = schools.slice(-3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard (Welcome, {user?.name || 'User'})</h1>
        <p className="text-gray-600 mt-2">Manage all schools and system-wide settings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Schools</p>
              <p className="text-3xl font-bold text-blue-600">{totalSchools}</p>
            </div>
            <Building2 className="h-12 w-12 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-green-600">{totalUsers}</p>
            </div>
            <Users className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Growth Rate</p>
              <p className="text-3xl font-bold text-purple-600">+12%</p>
            </div>
            <TrendingUp className="h-12 w-12 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Recent Schools */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Schools</h2>
            <Link
              href="/admin/create-school"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add School
            </Link>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {recentSchools.map((school) => (
            <div key={school.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{school.name}</h3>
                  <p className="text-sm text-gray-500">{school.address}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Created</p>
                  <p className="text-sm font-medium text-gray-900">{school.created_at}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-gray-200">
          <Link
            href="/schools"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            View all schools →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;