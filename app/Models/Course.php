<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\School;
use App\Models\User;
use App\Models\Material;

class Course extends Model
{
    protected $fillable = ['name', 'description', 'school_id', 'teacher_id', 'self_enrolled', 'max_students'];

    protected $casts = [
        'self_enrolled' => 'boolean',
    ];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    public function classes()
    {
        return $this->belongsToMany(Klass::class, 'course_classes');
    }

    public function students()
    {
        return $this->belongsToMany(User::class, 'enrollments')
            ->withPivot('enrolled_by', 'enrolled_at', 'status')
            ->withTimestamps();
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function materials()
    {
        return $this->hasMany(Material::class);
    }

    public function activeEnrollments()
    {
        return $this->enrollments()->where('status', 'active');
    }

    // Enrollment logic
    public function hasCapacity()
    {
        return $this->max_students === null ||
            $this->activeEnrollments()->count() < $this->max_students;
    }

    public function canEnroll(User $user)
    {
        return $this->hasCapacity() &&
            !$this->students()->where('users.id', $user->id)->exists();
    }

    public function enrollStudent(User $student, User $enrolledBy = null)
    {
        if (!$this->canEnroll($student)) {
            return false;
        }

        return Enrollment::create([
            'student_id' => $student->id,
            'course_id' => $this->id,
            'enrolled_by' => $enrolledBy ? $enrolledBy->id : $student->id,
            'status' => 'active'
        ]);
    }
}
