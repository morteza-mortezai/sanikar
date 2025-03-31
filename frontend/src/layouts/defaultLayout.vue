<template>
    <div class=" h-screen max-w-[50rem] mx-auto">
        <header class="text-white bg-black rounded-sm p-2">
            <nav>
                <span v-if="authStore.isLoggedIn">Welcome! {{ authStore.user?.user.name }}</span>
                <RouterLink v-else class="btn btn-primary" :to="{name:'loginPage'}">login</RouterLink>
                <button class="btn btn-error" v-if="authStore.isLoggedIn">logout</button>
            </nav>
        </header>
        <RouterView />
    </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth';

const authStore=useAuthStore()
</script>