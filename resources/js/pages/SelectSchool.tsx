import React from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import Layout from '../components/Layout';
import { School } from '../types';

interface SelectSchoolSpecificProps {
    schools: School[];
}

const SelectSchool: React.FC = () => {
    // Use 'any' to avoid linter error for now
    const { schools } = (usePage() as any).props;

    const handleSchoolSelection = (schoolId: number) => {
        // You might want to store the selected school in a session or similar on the backend
        // and then redirect the user to their dashboard based on their role.
        // For now, let's just redirect to the dashboard.

        // A simple way to handle this would be to send a POST request to the backend
        // with the selected school ID, and the backend would then handle the redirection.
        Inertia.post('/select-school-action', { school_id: schoolId });
    };

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-3xl font-bold mb-6">Select a School</h1>
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    {schools.length > 0 ? (
                        <ul className="space-y-4">
                            {schools.map((school: School) => (
                                <li key={school.id}>
                                    <button
                                        onClick={() => handleSchoolSelection(school.id)}
                                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        {school.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">No schools found for your account.</p>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default SelectSchool; 