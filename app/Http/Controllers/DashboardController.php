<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Course;
use App\Models\Material;
use App\Models\User;
use App\Models\Enrollment;

class DashboardController extends Controller
{
    /**
     * Display the dashboard based on user role.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $schools = $user->schools()->get();
        $selectedSchoolId = $request->session()->get('selected_school_id');

        // If no school is selected, or the selected one is invalid, try to set a default.
        if (!$selectedSchoolId || !$schools->contains('id', $selectedSchoolId)) {
            if ($schools->count() === 1) {
                // If user is in one school, auto-select it.
                $selectedSchoolId = $schools->first()->id;
                $request->session()->put('selected_school_id', $selectedSchoolId);
            } elseif ($schools->count() > 1) {
                // If user is in multiple schools, redirect to school selector
                // For now, we'll just render the dashboard without school-specific data
                // A dedicated school selection page should be implemented.
                $selectedSchoolId = null;
            }
        }

        $selectedSchool = $selectedSchoolId ? $schools->where('id', $selectedSchoolId)->first() : null;

        // Get data based on user role and school
        $dashboardData = $this->getDashboardData($user, $selectedSchoolId);

        return Inertia::render('Dashboard', array_merge([
            'user' => $user,
            'schools' => $schools,
            'selectedSchool' => $selectedSchool,
            'selectedSchoolId' => $selectedSchoolId,
        ], $dashboardData));
    }
    
    /**
     * Get dashboard data based on user role and school.
     */
    private function getDashboardData($user, $selectedSchoolId)
    {
        $data = [
            'courses' => collect(),
            'users' => collect(),
            'materials' => collect(),
        ];

        if ($user->isSuperAdmin()) {
            // Super admin gets all data, ungrouped by school for now
            $data['courses'] = Course::with('school')->get();
            $data['users'] = User::with('schools')->get();
            $data['materials'] = Material::with('course.school')->get();
            return $data;
        }

        if (!$selectedSchoolId) {
            // Return empty collections if no school is selected for non-admins
            return $data;
        }

        if ($user->isSchoolAdmin()) {
            // School admin gets all data for their selected school
            $data['courses'] = Course::where('school_id', $selectedSchoolId)->get();
            $data['users'] = User::whereHas('schools', fn($q) => $q->where('schools.id', $selectedSchoolId))->get();
            $data['materials'] = Material::whereHas('course', fn($q) => $q->where('school_id', $selectedSchoolId))->get();
        } elseif ($user->isTeacher()) {
            // Teacher gets their courses and the students in those courses
            $data['courses'] = $user->teachingCourses()->where('school_id', $selectedSchoolId)->get();
            $studentIds = Enrollment::whereIn('course_id', $data['courses']->pluck('id'))->pluck('student_id');
            $data['users'] = User::whereIn('id', $studentIds)->get();
            $data['materials'] = Material::whereIn('course_id', $data['courses']->pluck('id'))->get();
        } elseif ($user->isStudent()) {
            // Student gets their enrolled courses and materials for those courses
            $data['courses'] = $user->courses()->where('school_id', $selectedSchoolId)->get();
            $data['materials'] = Material::whereIn('course_id', $data['courses']->pluck('id'))->get();
        }

        return $data;
    }
}