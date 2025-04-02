<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskControllerTest extends TestCase
{
    use RefreshDatabase;

    private $user;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    /** @test */
    public function an_authenticated_user_can_store_a_task()
    {
        $this->actingAs($this->user);

        $taskData = [
            'title' => 'New Task',
            'description' => 'Task description',
            'start_date' => now()->toDateString(),
            'end_date' => now()->addDays(2)->toDateString(),
            'status' => 'pending',
        ];

        $response = $this->postJson('/api/tasks', $taskData);

        $response->assertStatus(201)
            ->assertJson(['title' => 'New Task']);

        $this->assertDatabaseHas('tasks', [
            'title' => 'New Task',
            'user_id' => $this->user->id,
        ]);
    }

    /** @test */
    public function it_requires_all_mandatory_fields()
    {
        $this->actingAs($this->user);

        $response = $this->postJson('/api/tasks', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['title', 'description']);
    }

    /** @test */
    public function it_can_get_all_tasks_for_authenticated_user()
    {
        Task::factory()->count(3)->create(['user_id' => $this->user->id]);
        $this->actingAs($this->user);

        $response = $this->getJson('/api/tasks');

        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    /** @test */
    public function it_can_get_filtered_tasks_by_status()
    {
        Task::factory()->create(['user_id' => $this->user->id, 'status' => 'pending']);
        Task::factory()->create(['user_id' => $this->user->id, 'status' => 'completed']);
        $this->actingAs($this->user);

        $response = $this->getJson('/api/tasks?status=pending');

        $response->assertStatus(200)
            ->assertJsonFragment(['status' => 'pending']);
    }

    /** @test */
    public function it_can_get_a_single_task()
    {
        $task = Task::factory()->create(['user_id' => $this->user->id]);
        $this->actingAs($this->user);

        $response = $this->getJson("/api/tasks/{$task->id}");

        $response->assertStatus(200)
            ->assertJson(['id' => $task->id]);
    }

    /** @test */
    public function it_cannot_access_another_users_task()
    {
        $otherUser = User::factory()->create();
        $task = Task::factory()->create(['user_id' => $otherUser->id]);
        $this->actingAs($this->user);

        $response = $this->getJson("/api/tasks/{$task->id}");

        $response->assertStatus(403);
    }

    /** @test */
    public function it_can_update_a_task()
    {
        $task = Task::factory()->create(['user_id' => $this->user->id]);
        $this->actingAs($this->user);

        $updateData = [
            'title' => 'Updated Task',
            'description' => 'Updated description',
            'status' => 'completed',
        ];

        $response = $this->putJson("/api/tasks/{$task->id}", $updateData);

        $response->assertStatus(200)
            ->assertJson(['message' => 'Task updated successfully']);

        $response->assertStatus(200)
            ->assertJson(['message' => 'Task updated successfully']);

        $this->assertDatabaseHas('tasks', ['title' => 'Updated Task']);

    }

    /** @test */
    public function it_cannot_update_another_users_task()
    {
        $otherUser = User::factory()->create();
        $task = Task::factory()->create(['user_id' => $otherUser->id]);
        $this->actingAs($this->user);

        $response = $this->putJson("/api/tasks/{$task->id}", ['title' => 'Unauthorized Update']);

        $response->assertStatus(403);
    }

    /** @test */
    public function it_can_update_task_status()
    {
        $task = Task::factory()->create(['user_id' => $this->user->id]);
        $this->actingAs($this->user);

        $response = $this->patchJson("/api/tasks/{$task->id}/status", ['status' => 'completed']);

        $response->assertStatus(200)
            ->assertJson(['message' => 'Status updated successfully']);

        $this->assertDatabaseHas('tasks', ['status' => 'completed']);
    }

    /** @test */
    public function it_cannot_update_status_of_another_users_task()
    {
        $otherUser = User::factory()->create();
        $task = Task::factory()->create(['user_id' => $otherUser->id]);
        $this->actingAs($this->user);

        $response = $this->patchJson("/api/tasks/{$task->id}/status", ['status' => 'completed']);

        $response->assertStatus(403);
    }

    /** @test */
    public function it_can_delete_a_task()
    {
        $task = Task::factory()->create(['user_id' => $this->user->id]);
        $this->actingAs($this->user);

        $response = $this->deleteJson("/api/tasks/{$task->id}");

        $response->assertStatus(200)
            ->assertJson(['message' => 'Deleted successfully']);

        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }

    /** @test */
    public function it_cannot_delete_another_users_task()
    {
        $otherUser = User::factory()->create();
        $task = Task::factory()->create(['user_id' => $otherUser->id]);
        $this->actingAs($this->user);

        $response = $this->deleteJson("/api/tasks/{$task->id}");

        $response->assertStatus(403);
    }
}
