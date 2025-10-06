<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  habit: Object
});

const emit = defineEmits(['edit', 'remove', 'update']);

// initiera status från habit
const status = ref(props.habit.status ?? 'Ej implementerad');

// uppdatera habit-objektet när status ändras
watch(status, (newVal) => {
  const updated = { ...props.habit, status: newVal };
  emit('update', updated);
});
</script>

<template>
  <div class="habit-item" :class="{ completed: status === 'Implementerad' }">
    <div class="habit-top">
      <span class="habit-name">{{ habit.name }}</span>
      <div class="habit-actions">
        <button class="btn edit" @click="$emit('edit', habit.id)">Ändra</button>
        <button class="btn remove" @click="$emit('remove', habit.id)">Ta bort</button>
      </div>
    </div>

    <div class="habit-frequency">
      <strong>Frekvens:</strong> {{ habit.frequency }}
    </div>

    <div class="habit-status">
      <label :for="'status-' + habit.id">Status</label>
      <select :id="'status-' + habit.id" v-model="status">
        <option>Ej implementerad</option>
        <option>Börjar implementeras</option>
        <option>Implementerad</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.habit-item {
  background: linear-gradient(135deg, #a5d6a7, #ffffff);
  border-radius: 15px;
  padding: 1rem 1.2rem;
  margin-bottom: 1rem;
  box-shadow: 0 6px 18px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, background 0.3s ease;
  border: 1px solid #a5d6a7;
}

/* Hover-effekt */
.habit-item:hover {
  transform: translateY(-4px);
  background: linear-gradient(135deg, #a5d6a73d);
}

/* Topprad: namn + knappar */
.habit-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Namn */
.habit-name {
  font-weight: 600;
  cursor: pointer;
  white-space: normal;
  overflow-wrap: break-word;
  word-break: break-word;
  flex: 1;
  text-align: left;
  font-size: 1.1rem;
  color: #1d4d1f;
}

/* Action-knappar */
.habit-actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.btn {
  padding: 0.4rem 0.9rem;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn.edit {
  background: #42a5f5;
  color: white;
}
.btn.edit:hover { background: #1e88e5; }

.btn.remove {
  background: #ef5350;
  color: white;
}
.btn.remove:hover { background: #c62828; }

/* Frekvensrad */
.habit-frequency {
  font-size: 0.95rem;
  color: #555;
  margin-top: 0.5rem;
  text-align: left;
}

/* Statusrad */
.habit-status {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.6rem;
}

.status-label {
  font-weight: bold;
  color: #333;
}

.status-select {
  padding: 0.35rem 0.6rem;
  border-radius: 12px;
  border: 1px solid #ccc;
  min-width: 140px;
  background: #fff;
}

/* Completed */
.completed .habit-name {
  text-decoration: line-through;
  color: #9e9e9e;
}

.completed select {
  opacity: 0.7;
}

/* Responsiv */
@media (max-width: 480px) {
  .habit-name,
  .habit-frequency,
  .habit-status {
    text-align: center;
  }
  
  .habit-actions {
    width: 100%;
    justify-content: center;
  }

  .habit-actions .btn {
    padding: 0.5rem;
    font-size: 0.9rem;
  }

  .status-select { 
    min-width: 120px; 
  }
}
</style>