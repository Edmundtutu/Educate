<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Add authorization logic here
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users'],
            'username' => ['required', 'string', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
            'role' => ['required', Rule::in(['super_admin', 'school_admin', 'teacher', 'student'])],
            'school_ids' => ['array'],
            'school_ids.*' => ['integer', 'exists:schools,id'],
        ];
    }
} 