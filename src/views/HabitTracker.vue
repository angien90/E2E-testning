<script setup>
import HabitForm from '../components/HabitForm.vue';
import HabitList from '../components/HabitList.vue';
import { ref, computed } from 'vue';
import { useHabits } from '../composables/useHabits';

const { habits, addHabit, updateHabit, removeHabit, toggleCompleted, sortHabits } = useHabits();

// Redigera vana
const habitToEdit = ref(null);
const selectedSort = ref(null);

const handleEdit = (habitId) => {
  habitToEdit.value = habits.value.find(h => h.id === habitId);
};

// När formuläret skickas: uppdatera vana om habitToEdit finns
const handleSubmit = (habit) => {
  if (habitToEdit.value) {
    habit.id = habitToEdit.value.id;
    habitToEdit.value = null;
    updateHabit(habit);
  } else {
    addHabit(habit);
  }
};

// Wrapper som sätter selectedSort och anropar sortHabits
const doSort = (by) => {
  selectedSort.value = by;
  sortHabits(by);
};

// Filtrering
const activeHabits = computed(() =>
  habits.value.filter(h => h.status !== 'Implementerad')
);

const implementedHabits = computed(() =>
  habits.value.filter(h => h.status === 'Implementerad')
);
</script>

<template>
  <div class="habit-tracker">
    <h1>🌱 HabitHero</h1>

    <section class="habit-form-section glass-card">
      <h2>Lägg till nya vanor</h2>
      <HabitForm :habit="habitToEdit" @submit="handleSubmit" />
    </section>

    <!-- Vanor att följa upp -->
    <section class="habit-list-section glass-card">
      <div class="habit-header">
        <h2>Följ upp dina vanor</h2>
        <div class="sort-buttons">
          <button @click="doSort('name')" :class="{ active: selectedSort === 'name' }">Sortera på vana</button>
          <button @click="doSort('date')" :class="{ active: selectedSort === 'date' }">Sortera på datum</button>
          <button @click="doSort('status')" :class="{ active: selectedSort === 'status' }">Sortera på status</button>
        </div>
      </div>
      <HabitList 
        :habits="activeHabits" 
        @update="updateHabit" 
        @remove="removeHabit" 
        @toggle="toggleCompleted" 
        @edit="handleEdit"
      />
    </section>

    <!-- Implementerade vanor -->
    <section v-if="implementedHabits.length" class="habit-list-section glass-card implemented">
      <div class="habit-header">
        <h2>Implementerade vanor</h2>
      </div>
      <HabitList 
        :habits="implementedHabits" 
        @update="updateHabit" 
        @remove="removeHabit" 
        @toggle="toggleCompleted" 
        @edit="handleEdit"
      />
    </section>
  </div>
</template>

<style scoped>
/* Bakgrund med gradient */
.habit-tracker {
  min-height: 100vh;
  background: linear-gradient(135deg, #e0f7fa, #a5d6a7);
  padding: 3rem 1rem;
  font-family: 'Segoe UI', sans-serif;
  border-radius: 10px;
}

/* Rubrik */
h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #2e7d32;
  font-size: 2.5rem;
  font-weight: bold;
}

/* Glass-card (genomskinlig kortstil) */
.glass-card {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
}

/* Header + sorteringsknappar */
.habit-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.sort-buttons button {
  margin-left: 0.5rem;
  padding: 0.4rem 0.9rem;
  border: none;
  border-radius: 20px;
  background: #66bb6a;
  color: white;
  cursor: pointer;
  transition: background 0.3s;
}

.sort-buttons button:hover {
  background: #388e3c;
}
</style>