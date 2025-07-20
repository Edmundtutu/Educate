import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import { usePage } from '@inertiajs/inertia-react';
import { Book, Users, FileText, Plus } from 'lucide-react';

function SchoolAdminDashboard() {
  const { user, courses, users, materials } = (usePage() as any).props;
  
  const schoolCourses = courses.filter(course => course.school_id === user?.current_school_id);
  const schoolUsers = users.filter(u => u.school_ids?.includes(user?.current_school_id || 0));
  const schoolMaterials = materials.filter(material => 
    schoolCourses.some(course => course.id === material.course_id)
  );

  const teachers = schoolUsers.filter(u => u.role === 'teacher');
  const students = schoolUsers.filter(u => u.role === 'student');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">School Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Managing {user?.school?.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Courses</p>
              <p className="text-3xl font-bold text-blue-600">{schoolCourses.length}</p>
            </div>
            <Book className="h-12 w-12 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Teachers</p>
              <p className="text-3xl font-bold text-green-600">{teachers.length}</p>
            </div>
            <Users className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Students</p>
              <p className="text-3xl font-bold text-purple-600">{students.length}</p>
            </div>
            <Users className="h-12 w-12 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Materials</p>
              <p className="text-3xl font-bold text-orange-600">{schoolMaterials.length}</p>
            </div>
            <FileText className="h-12 w-12 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              href="/admin/create-user"
              className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Plus className="h-5 w-5 text-gray-500 mr-3" />
              <span className="text-gray-700">Add Teacher/Student</span>
            </Link>
            <Link
              href="/courses"
              className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Book className="h-5 w-5 text-gray-500 mr-3" />
              <span className="text-gray-700">Manage Courses</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">New course created</span>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Teacher added</span>
              <span className="text-xs text-gray-500">1 day ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Material uploaded</span>
              <span className="text-xs text-gray-500">3 days ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Courses */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Courses</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {schoolCourses.slice(0, 5).map((course) => (
            <div key={course.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{course.name}</h3>
                  <p className="text-sm text-gray-500">{course.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Created</p>
                  <p className="text-sm font-medium text-gray-900">{course.created_at}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SchoolAdminDashboard;