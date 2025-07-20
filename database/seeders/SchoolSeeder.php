<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SchoolSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('schools')->insert([
            ['id' => 1, 'name' => 'Green Hill School', 'address' => '123 Education St, City Center', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'name' => 'Bright Future Academy', 'address' => '456 Learning Ave, Downtown', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 3, 'name' => 'Excellence High School', 'address' => '789 Knowledge Blvd, Uptown', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
} 