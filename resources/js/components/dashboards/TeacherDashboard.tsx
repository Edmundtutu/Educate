import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import { usePage } from '@inertiajs/inertia-react';
import { Book, Upload, FileText, Eye } from 'lucide-react';

function TeacherDashboard() {
  const { user, courses, materials } = (usePage() as any).props;
  
  const myCourses = courses.filter(course => course.teacher_id === user?.id);
  const myMaterials = materials.filter(material => material.uploaded_by === user?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.name || 'User'}!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">My Courses</p>
              <p className="text-3xl font-bold text-blue-600">{myCourses.length}</p>
            </div>
            <Book className="h-12 w-12 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Materials Uploaded</p>
              <p className="text-3xl font-bold text-green-600">{myMaterials.length}</p>
            </div>
            <FileText className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-3xl font-bold text-purple-600">247</p>
            </div>
            <Eye className="h-12 w-12 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              href="/materials/upload"
              className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Upload className="h-5 w-5 text-gray-500 mr-3" />
              <span className="text-gray-700">Upload New Material</span>
            </Link>
            <Link
              href="/courses"
              className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Book className="h-5 w-5 text-gray-500 mr-3" />
              <span className="text-gray-700">View All Courses</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Material uploaded</span>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Course updated</span>
              <span className="text-xs text-gray-500">1 day ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">New student enrolled</span>
              <span className="text-xs text-gray-500">3 days ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* My Courses */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">My Courses</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {myCourses.map((course) => (
            <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{course.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{course.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Created {course.created_at}</span>
                <Link
                  href={`/courses/${course.id}`}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;