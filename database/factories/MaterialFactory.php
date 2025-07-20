<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MaterialFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'file_type' => $this->faker->randomElement(['pdf', 'video', 'document']),
            'file_url' => $this->faker->url,
            'course_id' => 1, // override in seeder
            'uploaded_by' => 1, // override in seeder
        ];
    }
} 