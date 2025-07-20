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
}
