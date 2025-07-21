<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use App\Models\School;
use App\Models\Course;
use App\Models\Material;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'username',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * MANY TO MANY relationship
     * User and belong to various schools in the system
     * */
    public function schools()
    {
        return $this->belongsToMany(School::class, 'school_users');
    }
    /**
     * MANY TO MANY relationship
     * User and belong to many other classes in the system
     * */
    public function classes()
    {
        return $this->belongsToMany(Klass::class, 'user_classes');
    }

    /**
     * User(Student) has a many to many relationship with a course they are enrolled into
    */
    public function courses()
    {
        return $this->belongsToMany(Course::class, 'enrollments')
            ->withPivot('enrolled_by', 'enrolled_at', 'status')
            ->withTimestamps();
    }

    /**
     *  One to One Relationship with the School
    */
    public function currentSchool()
    {
        return $this->belongsTo(School::class, 'current_school_id');
    }

    /**
     * User (teacher) Has a ONE TO MANY Relationship with Course
     * Teacher can teach various courses in the system while a course can only be taught by one teacher
    */
    public function teachingCourses()
    {
        return $this->hasMany(Course::class, 'teacher_id');
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class, 'student_id');
    }

    // Role checking methods
    public function hasRole($role)
    {
        return $this->role === $role;
    }

    public function isSuperAdmin()
    {
        return $this->role === 'super_admin';
    }

    public function isSchoolAdmin()
    {
        return $this->role === 'school_admin';
    }

    public function isTeacher()
    {
        return $this->role === 'teacher';
    }

    public function isStudent()
    {
        return $this->role === 'student';
    }

    public function canManageSchool($schoolId)
    {
        return $this->isSuperAdmin() ||
            ($this->isSchoolAdmin() && $this->schools()->where('schools.id', $schoolId)->exists());
    }

    public function canAccessSchool($schoolId)
    {
        return $this->schools()->where('schools.id', $schoolId)->exists();
    }
}
