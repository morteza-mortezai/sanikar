<template>
  <form @submit.prevent="onSubmit" class="border rounded p-4">
    <h1>Login</h1>
    <input type="text" v-model="name">
    <div class="validator-hint">
      {{ nameProps }}
    </div>

    <input type="text" v-model="email">
    <input type="text" v-model="password">
    <button class="btn btn-primary">register</button>
  </form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import { login } from '@/service/auth/login'
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import { REQUIRED } from '@/const/validationMsg'
import { useAuthStore } from '@/stores/auth';

// init
const authStore = useAuthStore()
const router = useRouter()
const schema = toTypedSchema(yup.object({
  name: yup.string().required(REQUIRED),
  email: yup.string().required(REQUIRED),
  password: yup.string().required(REQUIRED)
}))
const { defineField, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    name: 'aa',
    email: 'a@a.com',
    password: '123456',
  }
})

// states
const isPwd = ref(true)
const [name, nameProps] = defineField('name')
const [email, emailProps] = defineField('email')
const [password, passwordProps] = defineField('password')

const { isPending, mutate: doLogin } = useMutation({
  mutationFn: login,
  onSuccess(data) {
    authStore.user = data.data
    const returnUrl = authStore.returnUrl
    if (returnUrl) {
      router.push({ name: returnUrl })

    } else {
      router.go(-1)
    }
  },
})
const onSubmit = handleSubmit((values) => {
  doLogin(values)
});
</script>