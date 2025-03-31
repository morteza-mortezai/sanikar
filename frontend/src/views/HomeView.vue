<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { getTasks } from '@/service/task/getTasks';

const {data}=useQuery({
  queryKey:['getTasks'],
  queryFn:getTasks
})
</script>

<template>
  <main class="max-w-[50rem] mx-auto">
  asd
  {{ data }}
  </main>
</template>
