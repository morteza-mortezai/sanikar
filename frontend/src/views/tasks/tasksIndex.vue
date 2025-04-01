<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { getTasks } from '@/service/task/getTasks';

const {data}=useQuery({
  queryKey:['getTasks'],
  queryFn:getTasks
})
</script>

<template>
  <main class="mt-4 rounded-sm bg-grey-100">
    <div class="flex justify-between items-center">
      <h1>Tasks</h1>
      <RouterLink :to="{name:'createTaskPage'}" class="btn btn-primary">Create</RouterLink>
    </div>
  asd
  {{ data }}
  </main>
</template>
