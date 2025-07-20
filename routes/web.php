<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\DashboardController;
use App\Models\User;
use Illuminate\Foundation\Application;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Debug route to test auth
    Route::get('/debug-auth', function () {
        $user = Auth::user();
        return Inertia::render('Debug', [
            'user' => $user,
            'session_school' => session('selected_school_id')
        ]);
    });

    // Resource routes for managing entities
    Route::resource('schools', SchoolController::class);
    Route::resource('users', UserController::class);
    Route::resource('courses', CourseController::class);
    Route::resource('materials', MaterialController::class);

    // Explicit routes for pages that might not fit resource naming
    Route::get('/materials/upload', [MaterialController::class, 'create'])->name('materials.upload');
    Route::get('/admin/create-user', [UserController::class, 'create'])->name('users.create');
    Route::get('/admin/create-school', [SchoolController::class, 'create'])->name('schools.create');
    // Add more protected routes as needed

    // Add a route for selecting school if user belongs to multiple schools
    Route::get('/select-school', function () {
        $user = Auth::user();
        $schools = $user->schools;
        return Inertia::render('SelectSchool', [
            'schools' => $schools
        ]);
    })->name('select-school');
    Route::post('/select-school-action', [AuthenticatedSessionController::class, 'selectSchool']);
});

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
                ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
                ->name('logout');
});

Route::get('/unauthorized', fn () => Inertia::render('Unauthorized'));

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
