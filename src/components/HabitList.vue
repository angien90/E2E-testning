<script setup>
import HabitItem from './HabitItem.vue';

const props = defineProps({
  habits: Array
});
const emit = defineEmits(['remove', 'toggle', 'update']);
</script>

<template>
  <div class="habit-list">
   <HabitItem
    v-for="habit in habits"
    :key="habit.id"
    :habit="habit"
    @remove="id => emit('remove', id)"
    @update="updated => emit('update', updated)"
    @edit="id => emit('edit', id)"
  />
  </div>
</template>

<style scoped>
.habit-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>