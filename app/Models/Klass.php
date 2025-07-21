<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Klass extends Model
{  use HasFactory;

    protected $table = 'classes';

    protected $fillable = [
        'name', 'school_id', 'grade_level'
    ];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_classes');
    }

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'course_classes');
    }

    public function students()
    {
        return $this->users()->where('role', 'student');
    }

    public function teachers()
    {
        return $this->users()->where('role', 'teacher');
    }
}
