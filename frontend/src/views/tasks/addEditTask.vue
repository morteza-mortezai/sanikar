<template>
  <form @submit.prevent="onSubmit" class="border rounded p-8 flex flex-col gap-4  ">
    <h1>
      {{ isEdit ? 'Edit Task' : 'Add New Task' }}
    </h1>
    <div v-if="isError" role="alert" class="alert alert-error">
      <span>{{ backendError }}</span>
    </div>
    <div>
      <input placeholder="Title*" :class="['input ', { 'input-error': titleProps.error }]" type="text" v-model="title">
      <div v-show="titleProps['error-message']" class="validator-hint">
        {{ titleProps['error-message'] }}
      </div>
    </div>
    <div>
      <input placeholder="Description*" :class="['input ', { 'input-error': descriptionProps.error }]" type="text"
        v-model="description">
      <div v-show="descriptionProps['error-message']" class="validator-hint">
        {{ descriptionProps['error-message'] }}
      </div>
    </div>
    <button type="submit" class="btn btn-primary">{{ isEdit ? 'Update' : '+Add' }}</button>
  </form>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import { login } from '@/service/auth/login';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/auth';
import quasarConfig from '@/utils/validationConfig';
import { createTask } from '@/service/task/createTask';
import { editTask } from '@/service/task/editTask';

// init
const authStore = useAuthStore()
const props = defineProps<{
  taskId?: number
}>()
const router = useRouter()
const schema = toTypedSchema(yup.object({
  title: yup.string().required().min(5),
  description: yup.string().required().min(5)
}))
const { defineField, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    title: 'do some excercise',
    description: 'walking, riding and ...',
  }
})

// states
const backendError = ref('')
const [title, titleProps] = defineField('title', quasarConfig)
const [description, descriptionProps] = defineField('description', quasarConfig)

// computed
const isEdit = computed(() => !!props.taskId)

// methods
const { mutate: doCrerateTask, isError } = useMutation({
  mutationFn: createTask,
  onSuccess() {
    router.push({ name: 'tasksPage' })
  }
})
const { mutate: doEditTask } = useMutation({
  mutationFn: editTask,
  onSuccess() {
    router.push({ name: 'tasksPage' })
  }
})
const onSubmit = handleSubmit((values) => {
  if(isEdit.value){
    doEditTask({taskId:props.taskId as number,body:values})
  }else{
    doCrerateTask(values)
  }
});
</script>