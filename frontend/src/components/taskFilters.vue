<template>
    <div class="bg-gray-100 rounded my-4 flex flex-wrap gap-2 p-4">
        <input @input="debouncedFn" :value="filters.search" type="text" class="input basis-[12rem]" placeholder="Search...">
        <select v-model="filters.status" class="select  basis-[8rem]" id="">
            <option value="pending">pending</option>
            <option value="completed">completed</option>
        </select>
        <select placeholder="Sort By" v-model="filters.sort_by" class="select  basis-[8rem]" id="">
            <option value="created_at">Created at</option>
            <option value="start_date">Start Date</option>
            <option value="end_date">End Date</option>
            <option value="status">status</option>
        </select>
        <select placeholder="Sort Type" v-model="filters.sort_type" class="select  basis-[6rem]" id="">
            <option value="ASC">ASC</option>
            <option value="DESC">DESC</option>
        </select>
        <buttom @click="useTaskStore().clear()" class="btn btn-error">Clear</buttom>
    </div>
</template>
<script setup lang="ts">
import { useTaskStore } from '@/stores/task';
import { storeToRefs } from 'pinia';
import { useDebounceFn } from '@vueuse/core'

const {filters}=storeToRefs(useTaskStore())

const debouncedFn = useDebounceFn((e) => {
  filters.value.search=e.target.value
}, 500)
</script>