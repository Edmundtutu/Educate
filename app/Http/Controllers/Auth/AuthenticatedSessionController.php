<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use App\Models\User; // Assuming User model is used

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Login');
    }

    /**
     * Handle an incoming authentication request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if (! Auth::attempt($request->only('username', 'password'), $request->boolean('remember'))) {
            throw ValidationException::withMessages([
                'username' => 'The provided credentials do not match our records.',
            ]);
        }

        $request->session()->regenerate();

        $user = Auth::user();

        // Super Admin Flow
        if ($user->role === 'super_admin') {
            return redirect()->intended('/dashboard');
        }

        // Non-Super Admin Flow (School Association)
        $schools = $user->schools()->get();

        if ($schools->isEmpty()) {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            return redirect('/login')->withErrors(['username' => 'You are not associated with any school.']);
        }

        if ($schools->count() === 1) {
            $school = $schools->first();
            // Store the selected school ID in the session for later use if needed
            $request->session()->put('selected_school_id', $school->id);
            return redirect()->intended('/dashboard');
        }

        // Multiple Schools: Redirect to a school selection page
        return redirect('/select-school');
    }

    /**
     * Handle school selection for users with multiple schools.
     */
    public function selectSchool(Request $request)
    {
        $request->validate([
            'school_id' => 'required|integer|exists:schools,id',
        ]);
        $user = Auth::user();
        $school = $user->schools()->where('schools.id', $request->school_id)->first();
        if (!$school) {
            return back()->withErrors(['school_id' => 'You are not associated with this school.']);
        }
        $request->session()->put('selected_school_id', $school->id);
        return redirect('/dashboard');
    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
} 