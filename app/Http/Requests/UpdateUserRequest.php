<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Add authorization logic here
        return true;
    }

    public function rules(): array
    {
        $userId = $this->route('user') ? $this->route('user')->id : null;

        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => ['sometimes', 'required', 'email', Rule::unique('users')->ignore($userId)],
            'username' => ['sometimes', 'required', 'string', Rule::unique('users')->ignore($userId)],
            'password' => ['nullable', 'string', 'min:8'],
            'role' => ['sometimes', 'required', Rule::in(['super_admin', 'school_admin', 'teacher', 'student'])],
            'school_ids' => ['array'],
            'school_ids.*' => ['integer', 'exists:schools,id'],
        ];
    }
} 