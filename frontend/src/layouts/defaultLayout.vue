<template>
    <div class=" h-screen max-w-[50rem] mx-auto">
        <header class="text-white bg-black rounded-sm p-2">
            <nav class="flex justify-between items-center">
                <span v-if="authStore.isLoggedIn">Welcome! {{ authStore.user?.user.name }}</span>
                <span v-else>Please login</span>
                <button class="btn btn-error" @click="onLogout()" v-if="authStore.isLoggedIn">logout</button>
                <RouterLink v-else class="btn btn-primary" :to="{ name: 'loginPage' }">login</RouterLink>
            </nav>
        </header>
        <RouterView />
    </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth';
import { logout } from '@/service/auth/logout';
import { useMutation } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';

// init
const authStore = useAuthStore()
const router = useRouter()

const { mutateAsync: doLogout } = useMutation({
    mutationFn: logout
})
async function onLogout() {
    await doLogout()
    authStore.user = null
    router.push({ name: 'loginPage' })
}
</script>