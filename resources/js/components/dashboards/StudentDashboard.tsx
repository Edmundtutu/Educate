import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import { usePage } from '@inertiajs/inertia-react';
import { Book, FileText, Clock } from 'lucide-react';

function StudentDashboard() {
  const { user, courses, materials } = (usePage() as any).props;
  
  const availableCourses = courses.filter(course => course.school_id === user?.current_school_id);
  const availableMaterials = materials.filter(material => 
    availableCourses.some(course => course.id === material.course_id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.name || 'User'}!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available Courses</p>
              <p className="text-3xl font-bold text-blue-600">{availableCourses.length}</p>
            </div>
            <Book className="h-12 w-12 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Study Materials</p>
              <p className="text-3xl font-bold text-green-600">{availableMaterials.length}</p>
            </div>
            <FileText className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Study Hours</p>
              <p className="text-3xl font-bold text-purple-600">42</p>
            </div>
            <Clock className="h-12 w-12 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h3>
          <div className="space-y-3">
            <Link
              href="/courses"
              className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Book className="h-5 w-5 text-gray-500 mr-3" />
              <span className="text-gray-700">Browse Courses</span>
            </Link>
            <Link
              href="/materials"
              className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FileText className="h-5 w-5 text-gray-500 mr-3" />
              <span className="text-gray-700">Study Materials</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Downloads</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Algebra Fundamentals</span>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Cell Structure Video</span>
              <span className="text-xs text-gray-500">1 day ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Shakespeare Analysis</span>
              <span className="text-xs text-gray-500">3 days ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Available Courses */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Available Courses</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {availableCourses.map((course) => (
            <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{course.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{course.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {materials.filter(m => m.course_id === course.id).length} materials
                </span>
                <Link
                  href={`/courses/${course.id}`}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View Course
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;