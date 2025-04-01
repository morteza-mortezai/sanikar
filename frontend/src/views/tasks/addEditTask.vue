<template>
  <main>
    <div class="flex gap-4 items-center my-4">

      <button class="btn btn-primary btn-soft" @click="router.go(-1)">Back</button>
      <h1>
        {{ isEdit ? 'Edit Task' : 'Add New Task' }}
      </h1>
    </div>
    <form @submit.prevent="onSubmit" class="border rounded p-8 flex flex-col gap-4  ">
      <div v-if="isError" role="alert" class="alert alert-error">
        <span>{{ backendError }}</span>
      </div>
      <div>
        <input placeholder="Title*" name="title" :class="['input ', { 'input-error': titleProps.error }]" type="text"
          v-model="title">
        <div v-show="titleProps['error-message']" class="validator-hint">
          {{ titleProps['error-message'] }}
        </div>
      </div>
      <div>
        <input placeholder="Description*" name="description" :class="['input ', { 'input-error': descriptionProps.error }]" type="text"
          v-model="description">
        <div v-show="descriptionProps['error-message']" class="validator-hint">
          {{ descriptionProps['error-message'] }}
        </div>
      </div>
      <button type="submit" class="btn btn-primary">{{ isEdit ? 'Update' : '+Add' }}</button>
    </form>
  </main>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import { createTask } from '@/service/task/createTask';
import { editTask } from '@/service/task/editTask';
import { getTask } from '@/service/task/getTask';
import validationConfig from '@/utils/validationConfig';

// Props
const props = defineProps<{ taskId?: number }>();
const router = useRouter();

// Validation Schema
const schema = toTypedSchema(yup.object({
  title: yup.string().required(),
  description: yup.string().required()
}));

// Form
const { defineField, handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    title: '',
    description: '',
  }
});

// Fields
const backendError = ref('');
const [title, titleProps] = defineField('title',validationConfig);
const [description, descriptionProps] = defineField('description',validationConfig);

// Computed
const isEdit = computed(() => !!props.taskId);


const { data } = useQuery({
  queryKey: ['getTask', props.taskId],
  queryFn: () => getTask(props.taskId as number),
  enabled: isEdit.value,
});


watch(data, (task) => {
  if (task) {
    setValues({
      title: task.title,
      description: task.description
    });
  }
});

// Mutations
const { mutate: doCreateTask, isError } = useMutation({
  mutationFn: createTask,
  onSuccess: () => router.push({ name: 'tasksPage' }),
});
const { mutate: doEditTask } = useMutation({
  mutationFn: editTask,
  onSuccess: () => router.push({ name: 'tasksPage' }),
});

// Submit Handler
const onSubmit = handleSubmit((values) => {
  if (isEdit.value) {
    doEditTask({ taskId: props.taskId as number, body: values });
  } else {
    doCreateTask(values);
  }
});

</script>