<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMaterialRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Add authorization logic here
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'file_type' => ['required', 'string', 'max:255'],
            'file_url' => ['required', 'string', 'url'], // Or use file validation rules if uploading
            'course_id' => ['required', 'exists:courses,id'],
            'uploaded_by' => ['required', 'exists:users,id'],
        ];
    }
} 