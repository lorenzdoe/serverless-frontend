<script setup>
import { RouterView } from "vue-router";
import ErrorDisplay from './components/ErrorDisplay.vue';
import { ref, provide } from 'vue';

const errorMessage = ref('');

const showError = (message) => {
  errorMessage.value = message;
};

const clearError = () => {
  errorMessage.value = '';
};

provide('showError', showError);
</script>

<template>
  <ErrorDisplay :message="errorMessage" @clearError="clearError" />
  <router-view />
</template>