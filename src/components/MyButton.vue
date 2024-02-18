<script setup lang="ts">
   defineProps<{
      active: boolean
      isLoading: boolean
   }>()

   defineEmits<{
      (e: 'click'): void
   }>()
</script>

<template>
  <button
    type="button"
    :class="[$style.button, { [$style['button--active']]: active }]"
    :disabled="!active || isLoading"
    @click="$emit('click')"
  >
    <slot v-if="!isLoading" />
    <div v-else>
      <div :class="$style.spinner" />
    </div>
  </button>
</template>

<style module>
   .button {
      background-color: #fcfcfc;

      border: 2px solid #dfe2e3;
      border-radius: 4px;

      font-size: 14px;
      font-weight: 600;

      padding: 10px;

      transition: background-color 0.5s ease-in-out, border-color 0.5s ease-in;
   }

   .button--active {
      background-color: #4c8bf7;
      color: #ffffff;

      border-color: #2a75f8;

      cursor: pointer;
   }

   .button--active:hover {
      opacity: 0.5;
   }

   .spinner {
      border: 4px solid #ffffff00;
      border-radius: 50%;
      border-top: 3px solid #ffffff;
      border-right: 3px solid #ffffff;
      width: 20px;
      height: 20px;
      animation: spin 2s linear infinite;
   }

   @keyframes spin {
      0% {
         transform: rotate(0deg);
      }
      100% {
         transform: rotate(360deg);
      }
   }
</style>
