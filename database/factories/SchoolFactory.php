<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SchoolFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->company . ' School',
            'address' => $this->faker->address,
        ];
    }
} 