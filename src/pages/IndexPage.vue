<template>
  <q-page class="row items-center justify-evenly">
    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Todo, Meta } from 'src/shared/types/models';
import ExampleComponent from 'src/components/ExampleComponent.vue';

const todos = ref<Todo[]>([
  {
    id: 1,
    content: 'ct1',
    completed: false
  },
  {
    id: 2,
    content: 'ct2',
    completed: true
  },
  {
    id: 3,
    content: 'ct3',
    completed: false
  },
  {
    id: 4,
    content: 'ct4',
    completed: false
  },
  {
    id: 5,
    content: 'ct5',
    completed: true
  }
]);

const meta = ref<Meta>({
  totalCount: 1200
});
</script>
