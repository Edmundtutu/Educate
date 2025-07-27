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

    // Super admin only routes
    Route::middleware(['role:super_admin'])->group(function () {
        Route::resource('schools', SchoolController::class);
                Route::get('/admin/create-school', [SchoolController::class, 'create'])->name('schools.create');
        Route::post('/schools/{id}/restore', [SchoolController::class, 'restore'])->name('schools.restore');
        Route::delete('/schools/{id}/force-delete', [SchoolController::class, 'forceDelete'])->name('schools.force-delete');
    });

    // School admin or super admin routes
    Route::middleware(['role:super_admin,school_admin'])->group(function () {
        Route::resource('users', UserController::class);
        Route::get('/admin/create-user', [UserController::class, 'create'])->name('users.create');
    });

    // Teacher, school admin, or super admin routes
    Route::middleware(['role:super_admin,school_admin,teacher'])->group(function () {
        Route::resource('courses', CourseController::class);
        Route::resource('materials', MaterialController::class);
        Route::get('/materials/upload', [MaterialController::class, 'create'])->name('materials.upload');
    });

    // Student accessible routes
    Route::middleware(['role:super_admin,school_admin,teacher,student'])->group(function () {
        // Add student-specific routes here
    });

    // Add a route for selecting school if user belongs to multiple schools
    Route::get('/select-school', function () {
        $user = Auth::user();
        $schools = $user->schools;
        return Inertia::render('SelectSchool', [
            'schools' => $schools
        ]);
    })->name('select-school');
    Route::post('/select-school-action', [AuthenticatedSessionController::class, 'selectSchool']);

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});

Route::get('/unauthorized', fn () => Inertia::render('Unauthorized'));

// Test route for role middleware
Route::get('/test-role', function () {
    return response()->json([
        'message' => 'You have access to this route',
        'user' => Auth::user(),
        'selected_school' => session('selected_school_id')
    ]);
})->middleware(['auth', 'role:super_admin']);

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
