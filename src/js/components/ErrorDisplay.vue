<template>
  <div v-if="visible" class="error-message">
    {{ message }}
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  message: String,
});

const visible = ref(false);

watch(() => props.message, (newValue) => {
  if (newValue) {
    visible.value = true;
    setTimeout(() => {
      visible.value = false;
      emit('clearError');
    }, 3000);
  }
});

const emit = defineEmits(['clearError']);
</script>

<style scoped>
.error-message {
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: red;
  color: white;
  padding: 10px;
  border-radius: 5px;
}
</style>