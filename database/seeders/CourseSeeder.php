<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('courses')->insert([
            ['id' => 1, 'name' => 'Mathematics 101', 'description' => 'Introduction to basic mathematics concepts', 'school_id' => 1, 'teacher_id' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'name' => 'Biology Fundamentals', 'description' => 'Basic principles of biology and life sciences', 'school_id' => 2, 'teacher_id' => 4, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 3, 'name' => 'English Literature', 'description' => 'Classical and modern literature analysis', 'school_id' => 1, 'teacher_id' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 4, 'name' => 'Chemistry Basics', 'description' => 'Introduction to chemical principles', 'school_id' => 2, 'teacher_id' => 3, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
} 