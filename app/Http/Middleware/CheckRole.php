<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        /** @var \App\Models\User|null $user */
        $user = Auth::user();

        if (!$user) {
            // If the user is not authenticated and not already on the login page, redirect them.
            if ($request->route()->named('login')) {
                return $next($request);
            }
            return redirect()->route('login');
        }

        if (empty($roles) || in_array($user->role, $roles)) {
            return $next($request);
        }

        return redirect('/unauthorized');
    }
}
