<template>
  <main>
    <div class="flex gap-4 items-center my-4">

      <button class="btn btn-primary btn-soft" @click="router.go(-1)">Back</button>
      <h1>
        {{ isEdit ? 'Edit Task' : 'Add New Task' }}
      </h1>
    </div>
    <form @submit.prevent="onSubmit" class="border rounded p-8 grid grid-cols-2 gap-4  ">
      <div v-if="isError || isUpdateError" role="alert" class="alert alert-error col-span-2">
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
        <input placeholder="Description*" name="description"
          :class="['input ', { 'input-error': descriptionProps.error }]" type="text" v-model="description">
        <div v-show="descriptionProps['error-message']" class="validator-hint">
          {{ descriptionProps['error-message'] }}
        </div>
      </div>
      <div>
        <input placeholder="Start*" name="start" :class="['input ', { 'input-error': startDateProps.error }]"
          type="date" v-model="startDate">
        <div v-show="startDateProps['error-message']" class="validator-hint">
          {{ startDateProps['error-message'] }}
        </div>
      </div>
      <div>
        <input placeholder="End*" name="start" :class="['input ', { 'input-error': endDateProps.error }]" type="date"
          v-model="endDate">
        <div v-show="endDateProps['error-message']" class="validator-hint">
          {{ endDateProps['error-message'] }}
        </div>
      </div>
      <select class="select  " v-model="status">
        <option value="pending">pending</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit" class="btn btn-success  col-span-2">{{ isEdit ? 'Update' : '+ Add' }}</button>
    </form>
  </main>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
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
const queryClient = useQueryClient();

// Validation Schema
const schema = toTypedSchema(yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  start_date: yup.string().optional().nullable(),
  end_date: yup.string().optional().nullable(),
  status: yup.string().oneOf(['pending', 'completed']),
}));

// Form
const { defineField, handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    title: '',
    description: '',
    status: 'pending'
  }
});

// Fields
const backendError = ref('');
const [title, titleProps] = defineField('title', validationConfig);
const [description, descriptionProps] = defineField('description', validationConfig);
const [startDate, startDateProps] = defineField('start_date', validationConfig);
const [endDate, endDateProps] = defineField('end_date', validationConfig);
const [status] = defineField('status', validationConfig);

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
      description: task.description,
      start_date: task.start_date,
      end_date: task.end_date,
      status: task.status
    });
  }
});

// Mutations
const { mutate: doCreateTask, isError } = useMutation({
  mutationFn: createTask,
  onSuccess:onSuccess,
  onError(error) {
    backendError.value = error?.response?.data?.message ?? 'something went wrong'
  }
});
const { mutate: doEditTask, isError: isUpdateError } = useMutation({
  mutationFn: editTask,
  onSuccess:onSuccess,
  onError(error) {
    backendError.value = error?.response?.data?.message ?? 'something went wrong'
  }
});

// Submit Handler
const onSubmit = handleSubmit((values) => {
  if (isEdit.value) {
    doEditTask({ taskId: props.taskId as number, body: values });
  } else {
    doCreateTask(values);
  }
});
function onSuccess(){
  queryClient.invalidateQueries({ queryKey: ['getTasks'] })
  router.push({ name: 'tasksPage' })
}
</script>