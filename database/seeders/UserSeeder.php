<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            ['id' => 1, 'name' => 'Edmond Rodriguez', 'email' => 'edmond@system.com', 'username' => 'edmond', 'password' => Hash::make('admin123'), 'role' => 'super_admin', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'name' => 'Jane Smith', 'email' => 'jane@greenhill.edu', 'username' => 'jane.smith', 'password' => Hash::make('password123'), 'role' => 'school_admin', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 3, 'name' => 'Michael Johnson', 'email' => 'michael@greenhill.edu', 'username' => 'michael.j', 'password' => Hash::make('teacher123'), 'role' => 'teacher', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 4, 'name' => 'Sarah Wilson', 'email' => 'sarah@brightfuture.edu', 'username' => 'sarah.w', 'password' => Hash::make('teacher456'), 'role' => 'teacher', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 5, 'name' => 'David Brown', 'email' => 'david@greenhill.edu', 'username' => 'david.b', 'password' => Hash::make('student123'), 'role' => 'student', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 6, 'name' => 'Emily Davis', 'email' => 'emily@brightfuture.edu', 'username' => 'emily.d', 'password' => Hash::make('student456'), 'role' => 'student', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 7, 'name' => 'Robert Taylor', 'email' => 'robert@schools.edu', 'username' => 'robert.t', 'password' => Hash::make('admin789'), 'role' => 'school_admin', 'created_at' => now(), 'updated_at' => now()],
        ];
        DB::table('users')->insert($users);
        // school_user pivot
        $schoolUser = [
            ['user_id' => 2, 'school_id' => 1],
            ['user_id' => 3, 'school_id' => 1],
            ['user_id' => 3, 'school_id' => 2],
            ['user_id' => 4, 'school_id' => 2],
            ['user_id' => 5, 'school_id' => 1],
            ['user_id' => 6, 'school_id' => 2],
            ['user_id' => 6, 'school_id' => 3],
            ['user_id' => 7, 'school_id' => 2],
            ['user_id' => 7, 'school_id' => 3],
        ];
        DB::table('school_user')->insert($schoolUser);
    }
} 