<script setup lang="ts">
import {  useMutation, useQueryClient } from '@tanstack/vue-query';
import { deleteTask } from '@/service/task/deleteTask';
import { updateTaskStatus } from '@/service/task/updateTaskStatus';
import TaskFilters from '@/components/taskFilters.vue';
import { useTaskStore } from '@/stores/task';
import { storeToRefs } from 'pinia';

// init
const queryClient = useQueryClient();
const { tasks } = storeToRefs(useTaskStore())

// methods
const { isPending: deleting, mutate: doDeleteTask } = useMutation({
  mutationFn: deleteTask,
  onSuccess() {
    queryClient.invalidateQueries({ queryKey: ['getTasks'] });
  }
})
const { mutate: doUpdateTaskStatus } = useMutation({
  mutationFn: updateTaskStatus,
  onSuccess() {
    queryClient.invalidateQueries({ queryKey: ['getTasks'] })
  }
});

</script>

<template>
  <main class="mt-4 rounded-sm ">
    <div class="flex justify-between items-center mb-4">
      <h1>Tasks</h1>
      <RouterLink :to="{ name: 'createTaskPage' }" class="btn btn-soft btn-success">+ Add New</RouterLink>
    </div>
    <TaskFilters />
    <ul>
      <li v-for="(task, i) in tasks" :key="i" class="mb-2 p-2 rounded  bg-gray-100 flex justify-between items-center">
        <div>

          <b>{{ task.title }}</b>
          <p class="text-sm">
            {{ task.description }}
          </p>
        </div>
        <div class="flex gap-1 ">
          <select class="select select-sm"
            @change="(v) => doUpdateTaskStatus({ taskId: task.id, status: v.target?.value })" :value="task.status">
            <option value="pending">pending</option>
            <option value="completed">Completed</option>
          </select>
          <RouterLink :to="{ name: 'editTaskPage', params: { taskId: task.id } }" class="btn btn-info btn-dash btn-sm">
            Edit
          </RouterLink>
          <button :disabled="deleting" @click="doDeleteTask(task.id)"
            class="btn btn-error btn-dash btn-sm">Delete</button>
        </div>
      </li>
    </ul>

  </main>
</template>
