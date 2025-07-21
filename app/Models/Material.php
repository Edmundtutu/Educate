<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Course;
use App\Models\User;

class Material extends Model
{
    protected $fillable = ['title', 'description', 'file_type', 'file_url', 'course_id', 'uploaded_by'];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    public function canAccess(User $user)
    {
        // Students can access if enrolled in course
        if ($user->isStudent()) {
            return $user->courses()->where('courses.id', $this->course_id)->exists();
        }

        // Teachers can access their course materials
        if ($user->isTeacher()) {
            return $this->course->teacher_id === $user->id;
        }

        // Admins can access materials in their schools
        return $user->canAccessSchool($this->course->school_id);
    }
}
