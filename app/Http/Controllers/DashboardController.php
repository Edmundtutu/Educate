<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Course;
use App\Models\Material;
use App\Models\User;

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
        $selectedSchoolId = $request->session()->get('selected_school_id');
        
        // Get user's schools if they have any
        $schools = $user->schools()->get();
        
        // Get selected school if user has one
        $selectedSchool = null;
        if ($selectedSchoolId) {
            $selectedSchool = $schools->where('id', $selectedSchoolId)->first();
        }
        
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
        
        // For super admin, get all data
        if ($user->role === 'super_admin') {
            $data['courses'] = Course::with('school')->get();
            $data['users'] = User::with('schools')->get();
            $data['materials'] = Material::with('course')->get();
        }
        // For other roles, filter by selected school
        elseif ($selectedSchoolId) {
            $data['courses'] = Course::where('school_id', $selectedSchoolId)->get();
            $data['users'] = User::whereHas('schools', function($query) use ($selectedSchoolId) {
                $query->where('schools.id', $selectedSchoolId);
            })->get();
            $data['materials'] = Material::whereHas('course', function($query) use ($selectedSchoolId) {
                $query->where('school_id', $selectedSchoolId);
            })->get();
        }
        
        return $data;
    }
} 