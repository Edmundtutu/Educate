<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $selectedSchoolId = $request->session()->get('selected_school_id');

        // Get selected school details if user is authenticated and has a selected school
        $selectedSchool = null;
        if ($user && $selectedSchoolId) {
            $selectedSchool = $user->schools()->where('schools.id', $selectedSchoolId)->first();
        }

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $user,
                'isLoggedIn' => $user !== null,
            ],
            'selected_school_id' => $selectedSchoolId,
            'selected_school' => $selectedSchool,
            'flash' => [
                'message' => $request->session()->get('message'),
                'error' => $request->session()->get('error'),
            ],
        ]);
    }
}
