<script setup lang="ts">
import { useQuery,useMutation,useQueryClient } from '@tanstack/vue-query';
import { getTasks } from '@/service/task/getTasks';
import { deleteTask } from '@/service/task/deleteTask';

// init
const queryClient = useQueryClient(); 

const { data: tasks } = useQuery({
  queryKey: ['getTasks'],
  queryFn: getTasks
})
const { isPending:deleting,mutate:doDeleteTask } = useMutation({
  mutationFn: deleteTask,
  onSuccess(){
    queryClient.invalidateQueries({ queryKey: ['getTasks'] }); // Refetch tasks after delete

  }
})

</script>

<template>
  <main class="mt-4 rounded-sm bg-grey-100">
    <div class="flex justify-between items-center mb-4">
      <h1>Tasks</h1>
      <RouterLink :to="{ name: 'createTaskPage' }" class="btn btn-primary">+ Add New</RouterLink>
    </div>
    <ul>
      <li v-for="(task, i) in tasks" :key="i" class="mb-2 p-2 rounded  bg-[#eee] flex justify-between items-center">
        <div>

          <b>{{ task.title }}</b>
          <p class="text-sm">
            {{ task.description }}
          </p>
        </div>
        <button :disabled="deleting" @click="doDeleteTask(task.id)" class="btn btn-error btn-dash btn-sm">Delete</button>
      </li>
    </ul>

  </main>
</template>
