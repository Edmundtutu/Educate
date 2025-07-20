import React, { useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { User, UserPlus, AlertCircle } from 'lucide-react';
import Layout from '../components/Layout';

const CreateUser: React.FC = () => {
  const { user } = (usePage() as any).props;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'teacher' as 'teacher' | 'student'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.role) {
      alert('Please fill in all required fields');
      return;
    }

    // Simulate user creation
    alert(`${formData.role} "${formData.name}" created successfully!`);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      role: 'teacher'
    });
  };

  if (user?.role !== 'school_admin') {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-700">Only school administrators can create users.</span>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create User</h1>
          <p className="text-gray-600 mt-2">Add new teachers and students to your school</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter full name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter email address"
                required
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Role *
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <User className="h-5 w-5 text-blue-500 mr-2" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium">Account Information</p>
                  <p>A temporary password will be generated and sent to the user's email address.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={() => setFormData({
                  name: '',
                  email: '',
                  role: 'teacher'
                })}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Create User
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateUser;