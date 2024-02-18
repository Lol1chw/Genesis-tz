<script setup lang="ts">
    import type { ColorsTag } from '@/types/tags'
   withDefaults(
      defineProps<{
         color?: ColorsTag
      }>(),
      {
         color: 'blue'
      }
   )
</script>

<template>
  <span :class="`tag tag--${color}`">
    <slot />
  </span>
</template>

<style scoped>
   .tag {
      padding: 2px;

      border: 1px solid;
      border-radius: 4px;
   }

   .tag--green {
      color: #389e0d;
      background: #f6ffed;
      border-color: #b7eb8f;
   }

   .tag--blue {
      color: #1d39c4;
      background: #f0f5ff;
      border-color: #adc6ff;
   }

   .tag--pink {
      color: #c41d7f;
      background: #fff0f6;
      border-color: #ffadd2;
   }
</style>
