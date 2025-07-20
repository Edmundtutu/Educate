import React from 'react';
import { usePage } from '@inertiajs/inertia-react';
import SuperAdminDashboard from '../components/dashboards/SuperAdminDashboard';
import SchoolAdminDashboard from '../components/dashboards/SchoolAdminDashboard';
import TeacherDashboard from '../components/dashboards/TeacherDashboard';
import StudentDashboard from '../components/dashboards/StudentDashboard';
import Layout from '../components/Layout';

const Dashboard: React.FC = () => {
  const { user } = (usePage() as any).props;

  if (!user) {
    return <div>Loading...</div>;
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'super_admin':
        return <SuperAdminDashboard />;
      case 'school_admin':
        return <SchoolAdminDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'student':
        return <StudentDashboard />;
      default:
        return <div>Invalid role</div>;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {renderDashboard()}
      </div>
    </Layout>
  );
};

export default Dashboard;