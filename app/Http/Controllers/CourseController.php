<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\School;
use App\Models\User;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::with(['school', 'teacher'])->get();
        return Inertia::render('Courses', [
            'courses' => $courses,
        ]);
    }

    public function create()
    {
        $schools = School::all();
        $teachers = User::where('role', 'teacher')->get();
        return Inertia::render('Courses/Create', [
            'schools' => $schools,
            'teachers' => $teachers,
        ]);
    }

    public function store(StoreCourseRequest $request)
    {
        Course::create($request->validated());
        return redirect()->route('courses.index')
            ->with('success', 'Course created successfully.');
    }

    public function show(Course $course)
    {
        return Inertia::render('Courses/Show', [
            'course' => $course->load(['school', 'teacher', 'materials']),
        ]);
    }

    public function edit(Course $course)
    {
        $schools = School::all();
        $teachers = User::where('role', 'teacher')->get();
        return Inertia::render('Courses/Edit', [
            'course' => $course->load(['school', 'teacher']),
            'schools' => $schools,
            'teachers' => $teachers,
        ]);
    }

    public function update(UpdateCourseRequest $request, Course $course)
    {
        $course->update($request->validated());
        return redirect()->route('courses.index')
            ->with('success', 'Course updated successfully.');
    }

    public function destroy(Course $course)
    {
        $course->delete();
        return redirect()->route('courses.index')
            ->with('success', 'Course deleted successfully.');
    }
} 