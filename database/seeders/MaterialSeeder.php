<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MaterialSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('materials')->insert([
            ['id' => 1, 'title' => 'Algebra Fundamentals', 'description' => 'Complete guide to algebraic expressions', 'file_type' => 'pdf', 'file_url' => '/materials/algebra.pdf', 'course_id' => 1, 'uploaded_by' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'title' => 'Cell Structure Video', 'description' => 'Animated explanation of cell components', 'file_type' => 'video', 'file_url' => '/materials/cell-structure.mp4', 'course_id' => 2, 'uploaded_by' => 4, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 3, 'title' => 'Shakespeare Analysis', 'description' => 'Study guide for Hamlet', 'file_type' => 'document', 'file_url' => '/materials/hamlet-analysis.docx', 'course_id' => 3, 'uploaded_by' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 4, 'title' => 'Periodic Table Reference', 'description' => 'Interactive periodic table with element details', 'file_type' => 'pdf', 'file_url' => '/materials/periodic-table.pdf', 'course_id' => 4, 'uploaded_by' => 3, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
} 