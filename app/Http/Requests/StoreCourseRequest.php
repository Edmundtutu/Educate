<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCourseRequest extends FormRequest
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
            'description' => ['nullable', 'string'],
            'school_id' => ['required', 'exists:schools,id'],
            'teacher_id' => ['required', 'exists:users,id', 'not_in:super_admin,school_admin,student'], // ensure teacher role
        ];
    }
} 