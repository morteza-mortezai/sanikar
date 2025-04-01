<template>
  <form @submit.prevent="onSubmit" class="border rounded p-8 flex flex-col gap-4  ">
    <h1>Login</h1>
    <div v-if="isError" role="alert" class="alert alert-error">
      <span>{{ backendError }}</span>
    </div>
    <div>
      <input placeholder="Email*" :class="['input ', { 'input-error': emailProps.error }]" type="text" v-model="email">
      <div v-show="emailProps['error-message']" class="validator-hint">
        {{ emailProps['error-message'] }}
      </div>
    </div>
    <div>
      <input placeholder="Password*" :class="['input ', { 'input-error': passwordProps.error }]" type="text"
        v-model="password">
      <div v-show="passwordProps['error-message']" class="validator-hint">
        {{ passwordProps['error-message'] }}
      </div>
    </div>
    <button type="submit" class="btn btn-primary">login</button>
    <RouterLink :to="{name:'registerPage'}">Register</RouterLink>
  </form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import { login } from '@/service/auth/login';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/auth';
import validationConfig from '@/utils/validationConfig';

// init
const authStore = useAuthStore()
const router = useRouter()
const schema = toTypedSchema(yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(5)
}))
const { defineField, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    email: 'admin@gmail.com',
    password: '123456',
  }
})

// states
const backendError = ref('')
const [email, emailProps] = defineField('email', validationConfig)
const [password, passwordProps] = defineField('password', validationConfig)

const { mutate: doLogin, isError } = useMutation({
  mutationFn: login,
  onSuccess(data) {
    authStore.user = data.data
    router.push({name:'tasksPage'})
  },
  onError(error: any) {
    backendError.value = error?.response?.data?.message || 'something went wrong'
  },
})
const onSubmit = handleSubmit((values) => {
  doLogin(values)
});
</script>