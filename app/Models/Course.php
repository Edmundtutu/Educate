<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\School;
use App\Models\User;
use App\Models\Material;

class Course extends Model
{
    protected $fillable = ['name', 'description', 'school_id', 'teacher_id'];

    public function school() { return $this->belongsTo(School::class); }
    public function teacher() { return $this->belongsTo(User::class, 'teacher_id'); }
    public function materials() { return $this->hasMany(Material::class); }
} 