import { defineStore } from 'pinia';
// import { LoginResponse } from 'src/types/login';
import { ref, computed } from 'vue';

// init

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<any | null>(null);

    const isAdmin = computed(() => user.value?.role == 'admin');

    return { user, isAdmin };
  });
