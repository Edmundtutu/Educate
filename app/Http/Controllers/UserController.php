<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\School;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('schools')->get();
        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }

    public function create()
    {
        $schools = School::all();
        return Inertia::render('CreateUser', [
            'schools' => $schools,
        ]);
    }

    public function store(StoreUserRequest $request)
    {
        $userData = $request->validated();
        $userData['password'] = Hash::make($userData['password']);
        $user = User::create($userData);

        if (isset($userData['school_ids'])) {
            $user->schools()->sync($userData['school_ids']);
        }

        return redirect()->route('users.index')
            ->with('success', 'User created successfully.');
    }

    public function show(User $user)
    {
        return Inertia::render('Users/Show', [
            'user' => $user->load('schools'),
        ]);
    }

    public function edit(User $user)
    {
        $schools = School::all();
        return Inertia::render('Users/Edit', [
            'user' => $user->load('schools'),
            'schools' => $schools,
        ]);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $userData = $request->validated();
        if (isset($userData['password'])) {
            $userData['password'] = Hash::make($userData['password']);
        }

        $user->update($userData);

        if (isset($userData['school_ids'])) {
            $user->schools()->sync($userData['school_ids']);
        } else {
            // If school_ids is not present in request, detach all schools
            $user->schools()->detach();
        }

        return redirect()->route('users.index')
            ->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('users.index')
            ->with('success', 'User deleted successfully.');
    }
} 