import React, { useEffect } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import SuperAdminDashboard from '../components/dashboards/SuperAdminDashboard';
import SchoolAdminDashboard from '../components/dashboards/SchoolAdminDashboard';
import TeacherDashboard from '../components/dashboards/TeacherDashboard';
import StudentDashboard from '../components/dashboards/StudentDashboard';
import Layout from '../components/Layout';

const Dashboard: React.FC = () => {
  const { auth } = (usePage() as any).props;
  const user = auth?.user;

  useEffect(() => {
    if (!auth || !auth.user) {
      Inertia.visit('/login');
    }
  }, [auth]);

  if (!user) {
    return <div>Redirecting to login...</div>;
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
