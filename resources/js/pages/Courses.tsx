import React from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { Book, FileText, User } from 'lucide-react';
import Layout from '../components/Layout';

function Courses() {
  const { user, courses, users, materials } = (usePage() as any).props;

  const getFilteredCourses = () => {
    if (user?.role === 'super_admin') {
      return courses;
    }
    if (user?.role === 'teacher') {
      return courses.filter(course => course.teacher_id === user.id);
    }
    return courses.filter(course => course.school_id === user?.current_school_id);
  };

  const filteredCourses = getFilteredCourses();

  const getTeacherName = (teacherId) => {
    if (!teacherId) return 'Not assigned';
    const teacher = users.find(u => u.id === teacherId);
    return teacher?.name || 'Unknown';
  };

  const getMaterialCount = (courseId) => {
    return materials.filter(m => m.course_id === courseId).length;
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-600 mt-2">
            {user?.role === 'teacher' ? 'Your courses' : 'Available courses'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Book className="h-8 w-8 text-blue-600" />
                  <span className="text-sm text-gray-500">
                    {getMaterialCount(course.id)} materials
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {course.name}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{getTeacherName(course.teacher_id)}</span>
                  </div>
                  <span>{course.created_at}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <Link
                    href={`/courses/${course.id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </Link>
                  
                  {user?.role === 'student' && (
                    <Link
                      href={`/courses/${course.id}/materials`}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Materials
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <Book className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses available</h3>
            <p className="text-gray-600">
              {user?.role === 'teacher' 
                ? 'You haven\'t been assigned any courses yet.' 
                : 'No courses are available for your school.'}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Courses;