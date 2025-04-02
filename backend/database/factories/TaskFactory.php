<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'user_id' => User::factory(), // Creates a user if not provided
            'start_date' => now(),
            'end_date' => now()->addDays(3),
            'status' => $this->faker->randomElement(['pending', 'completed']),
        ];
    }
}
