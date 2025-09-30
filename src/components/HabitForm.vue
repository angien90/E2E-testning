<script setup>
import { ref, watch } from 'vue';
const emit = defineEmits(['submit']);

const props = defineProps({
  habit: Object
});

const name = ref('');
const frequency = ref('dagligen');

// Om habit ändras, fyll formuläret
watch(() => props.habit, (newHabit) => {
  if (newHabit) {
    name.value = newHabit.name;
    frequency.value = newHabit.frequency;
  } else {
    name.value = '';
    frequency.value = 'dagligen';
  }
});

const submit = () => {
  emit('submit', { name: name.value, frequency: frequency.value });
  name.value = '';
  frequency.value = 'dagligen';
};
</script>


<template>
  <form @submit.prevent="submit">
    <input v-model="name" placeholder="Ny vana" required />
    <select class="frequency" v-model="frequency">
      <option>dagligen</option>
      <option>veckovis</option>
      <option>månatligen</option>
    </select>
    <button type="submit">{{ editMode ? 'Spara' : 'Lägg till' }}</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  justify-content: center;
}

input, select {
  padding: 0.6rem 1rem;
  border-radius: 25px;
  border: 1px solid #ccc;
  flex: 1;
  min-width: 120px;
  outline: none;
  transition: border 0.3s;
}

input:focus, select:focus {
  border: 1px solid #4caf50;
}

.frequency {
  max-width: 200px;
}

button {
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  border: none;
  background: #4caf50;
  color: white;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #388e3c;
}
</style>