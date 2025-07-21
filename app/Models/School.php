<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Course;

class School extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name', 'address'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'schools_users');
    }

    public function classes()
    {
        return $this->hasMany(Klass::class);
    }

    public function courses()
    {
        return $this->hasMany(Course::class);
    }

    public function admins()
    {
        return $this->users()->where('role', 'school_admin');
    }

    public function teachers()
    {
        return $this->users()->where('role', 'teacher');
    }

    public function students()
    {
        return $this->users()->where('role', 'student');
    }
}
