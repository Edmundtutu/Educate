<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCourseRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Add authorization logic here
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'school_id' => ['sometimes', 'required', 'exists:schools,id'],
            'teacher_id' => ['sometimes', 'required', 'exists:users,id', 'not_in:super_admin,school_admin,student'],
        ];
    }
} 