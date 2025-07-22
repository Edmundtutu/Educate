<?php

namespace App\Models;

use App\Models\User;
use App\Models\Course;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class School extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name', 'address'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'school_user');
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
