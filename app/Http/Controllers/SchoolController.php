<?php

namespace App\Http\Controllers;

use App\Models\School;
use App\Http\Requests\StoreSchoolRequest;
use App\Http\Requests\UpdateSchoolRequest;
use Inertia\Inertia;

class SchoolController extends Controller
{
    public function index()
    {
        // Super admin should see all schools, including soft-deleted ones
        $schools = School::withTrashed()->get();
        return Inertia::render('Schools', [
            'schools' => $schools,
        ]);
    }

    public function create()
    {
        return Inertia::render('CreateSchool');
    }

    public function store(StoreSchoolRequest $request)
    {
        School::create($request->validated());
        return redirect()->route('schools.index')
            ->with('success', 'School created successfully.');
    }

    public function show(School $school)
    {
        // You might want to show a single school's details page
        return Inertia::render('Schools/Show', [
            'school' => $school,
        ]);
    }

    public function edit(School $school)
    {
        return Inertia::render('Schools/Edit', [
            'school' => $school,
        ]);
    }

    public function update(UpdateSchoolRequest $request, School $school)
    {
        $school->update($request->validated());
        return redirect()->route('schools.index')
            ->with('success', 'School updated successfully.');
    }

    public function destroy(School $school)
    {
        $school->delete();
        return redirect()->route('schools.index')
            ->with('success', 'School soft-deleted successfully.');
    }

    /**
     * Restore a soft-deleted school.
     */
    public function restore($id)
    {
        $school = School::withTrashed()->findOrFail($id);
        $school->restore();
        return redirect()->route('schools.index')
            ->with('success', 'School restored successfully.');
    }

    /**
     * Permanently delete a school.
     */
    public function forceDelete($id)
    {
        $school = School::withTrashed()->findOrFail($id);
        $school->forceDelete();
        return redirect()->route('schools.index')
            ->with('success', 'School permanently deleted successfully.');
    }
}