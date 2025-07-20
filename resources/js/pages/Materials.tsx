import React from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { FileText, Download, Eye, Calendar } from 'lucide-react';
import Layout from '../components/Layout';

function Materials() {
  const { user, materials, courses, users } = (usePage() as any).props;

  const getFilteredMaterials = () => {
    if (user?.role === 'super_admin') {
      return materials;
    }
    if (user?.role === 'teacher') {
      return materials.filter(material => material.uploaded_by === user.id);
    }
    // For students and school admins, show materials from their school
    const schoolCourses = courses.filter(course => course.school_id === user?.current_school_id);
    return materials.filter(material => 
      schoolCourses.some(course => course.id === material.course_id)
    );
  };

  const filteredMaterials = getFilteredMaterials();

  const getCourseName = (courseId: number) => {
    const course = courses.find(c => c.id === courseId);
    return course?.name || 'Unknown Course';
  };

  const getUploaderName = (uploaderId: number) => {
    const uploader = users.find(u => u.id === uploaderId);
    return uploader?.name || 'Unknown';
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return '📄';
      case 'video':
        return '🎥';
      case 'document':
        return '📝';
      default:
        return '📎';
    }
  };

  const groupedMaterials = filteredMaterials.reduce((acc, material) => {
    const courseName = getCourseName(material.course_id);
    if (!acc[courseName]) {
      acc[courseName] = [];
    }
    acc[courseName].push(material);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Study Materials</h1>
          <p className="text-gray-600 mt-2">
            {user?.role === 'teacher' ? 'Materials you\'ve uploaded' : 'Available study materials'}
          </p>
        </div>

        {Object.entries(groupedMaterials).map(([courseName, courseMaterials]) => (
          <div key={courseName} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{courseName}</h2>
            
            <div className="bg-white rounded-lg shadow-md">
              <div className="divide-y divide-gray-200">
                {(courseMaterials as any[]).map((material) => (
                  <div key={material.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{getFileIcon(material.file_type)}</div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {material.title}
                          </h3>
                          <p className="text-sm text-gray-600">{material.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span>Uploaded by {getUploaderName(material.uploaded_by)}</span>
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {material.created_at}
                            </span>
                            <span className="capitalize">{material.file_type}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => alert(`Viewing ${material.title}`)}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </button>
                        
                        <button
                          onClick={() => alert(`Downloading ${material.title}`)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {filteredMaterials.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No materials available</h3>
            <p className="text-gray-600">
              {user?.role === 'teacher' 
                ? 'You haven\'t uploaded any materials yet.' 
                : 'No study materials are available yet.'}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Materials;