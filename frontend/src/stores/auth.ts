import type { ILoginResponse } from '@/type/loginResponse';
import { defineStore } from 'pinia';
// import { LoginResponse } from 'src/types/login';
import { ref, computed } from 'vue';

// init

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<ILoginResponse | null>(null);

    const token = computed(() => user.value?.token );

    return { user,  token };
  },
  {
    persist: true,
  }
);
