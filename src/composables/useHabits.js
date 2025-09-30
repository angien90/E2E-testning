import { ref, watch } from 'vue';

const STORAGE_KEY = 'habits_v1';
const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

const saved = isBrowser ? localStorage.getItem(STORAGE_KEY) : null;
const habits = ref(saved ? JSON.parse(saved) : []);

watch(
  habits,
  (newVal) => {
    if (!isBrowser) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal));
    } catch (e) {
      console.error('Could not save habits to localStorage', e);
    }
  },
  { deep: true }
);

export function useHabits() {
  const addHabit = (habit) => {
    const h = {
      id: Date.now(),
      name: habit.name || 'Ny vana',
      frequency: habit.frequency ?? 'dagligen',
      status: habit.status ?? 'Ej implementerad',
      completed: (habit.status ?? '') === 'Implementerad' || !!habit.completed,
      createdAt: new Date().toISOString()
    };
    habits.value.push(h);
  };

  const removeHabit = (id) => {
    habits.value = habits.value.filter(h => h.id !== id);
  };

  const updateHabit = (updatedHabit) => {
    const index = habits.value.findIndex(h => h.id === updatedHabit.id);
    if (index !== -1) {
      habits.value.splice(index, 1, { ...updatedHabit });
    }
  };

  const toggleCompleted = (id) => {
    const habit = habits.value.find(h => h.id === id);
    if (habit) habit.completed = !habit.completed;
  };

  // Sorteringsfunktion - nu stödjer 'name', 'date' och 'status'
  const sortHabits = (by = 'date', direction = 'asc') => {
    const dir = direction === 'desc' ? -1 : 1;

    if (by === 'name') {
      habits.value.sort((a, b) => dir * a.name.localeCompare(b.name));
    } else if (by === 'date') {
      // latest först om asc = false, här använder vi createdAt
      habits.value.sort((a, b) => dir * (new Date(a.createdAt) - new Date(b.createdAt)));
    } else if (by === 'status') {
      // Definiera önskad statusordning (högst prioritet först)
      const order = {
        'Implementerad': 0,
        'Börjar implementeras': 1,
        'Ej implementerad': 2
      };
      habits.value.sort((a, b) => dir * ((order[a.status] ?? 99) - (order[b.status] ?? 99)));
    }
  };

  return { habits, addHabit, removeHabit, updateHabit, toggleCompleted, sortHabits };
}