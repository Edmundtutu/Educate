import React from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { Link } from '@inertiajs/inertia-react';
import { Building2, Users, Calendar, Plus } from 'lucide-react';
import Layout from '../components/Layout';

function Schools() {
  const { user, schools, users } = (usePage() as any).props;

  const getSchoolStats = (schoolId) => {
    const schoolUsers = users.filter(u => u.school_ids?.includes(schoolId));
    const teachers = schoolUsers.filter(u => u.role === 'teacher').length;
    const students = schoolUsers.filter(u => u.role === 'student').length;
    return { teachers, students };
  };

  if (user?.role !== 'super_admin') {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <Building2 className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-700">Only super administrators can view all schools.</span>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Schools</h1>
              <p className="text-gray-600 mt-2">Manage all schools in the system</p>
            </div>
            <Link
              href="/admin/create-school"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add School
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.map((school) => {
            const stats = getSchoolStats(school.id);
            
            return (
              <div key={school.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Building2 className="h-8 w-8 text-blue-600" />
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {school.created_at}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {school.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {school.address}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{stats.teachers}</p>
                      <p className="text-sm text-gray-500">Teachers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{stats.students}</p>
                      <p className="text-sm text-gray-500">Students</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                      <Users className="h-4 w-4 mr-1" />
                      View Users
                    </button>
                    
                    <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                      Manage
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {schools.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No schools yet</h3>
            <p className="text-gray-600 mb-4">Get started by creating your first school.</p>
            <Link
              href="/admin/create-school"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create School
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Schools;