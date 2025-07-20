<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMaterialRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Add authorization logic here
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'file_type' => ['sometimes', 'required', 'string', 'max:255'],
            'file_url' => ['sometimes', 'required', 'string', 'url'],
            'course_id' => ['sometimes', 'required', 'exists:courses,id'],
            'uploaded_by' => ['sometimes', 'required', 'exists:users,id'],
        ];
    }
} 