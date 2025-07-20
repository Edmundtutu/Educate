<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CourseFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->words(3, true),
            'description' => $this->faker->sentence,
            'school_id' => 1, // override in seeder
            'teacher_id' => 1, // override in seeder
        ];
    }
} 