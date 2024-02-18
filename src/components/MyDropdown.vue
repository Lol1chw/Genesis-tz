<script setup lang="ts">
   import { onMounted, onUnmounted, ref } from 'vue'
   import type { Option } from '@/types/dropdown'
   import CheckIcon from './icons/CheckIcon.vue'
   import DownArrowIcon from './icons/DownArrowIcon.vue'

   defineProps<{
      options: Option[]
      selectedOption: Option
   }>()

   const emit = defineEmits<{
      (e: 'selectOption', option: Option): void
   }>()

   const isOpen = ref(false)

   const toggleDropdown = () => {
      isOpen.value = !isOpen.value
   }

   const selectOption = (option: Option) => {
      emit('selectOption', option)
      isOpen.value = false
   }

   const handleOutsideClick = (event: Event) => {
      if (!(event.target as HTMLElement).closest('.dropdown')) {
         isOpen.value = false
      }
   }

   onMounted(() => {
      window.addEventListener('click', handleOutsideClick)
   })

   onUnmounted(() => {
      window.removeEventListener('click', handleOutsideClick)
   })
</script>

<template>
  <div class="dropdown">
    <button @click="toggleDropdown">
      <slot
        name="prefix"
        :selected-option="selectedOption"
      >
        {{ selectedOption.label }}
      </slot>
      <DownArrowIcon />
    </button>
    <ul
      v-if="isOpen"
      class="dropdown-list"
    >
      <li
        v-for="(option, i) in options"
        :key="option.value"
        :tabindex="i + 1"
        :class="[{ 'active-option': option.value === selectedOption.value }, 'option']"
        @keydown.enter="selectOption(option)"
        @click="selectOption(option)"
      >
        <CheckIcon v-if="option.value === selectedOption.value" />
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
   .dropdown {
      position: relative;
      display: flex;

      max-width: 300px;
   }

   button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 100%;

      padding: 8px;

      font-size: 14px;

      cursor: pointer;

      border: 1px solid #ccc;
      border-width: 2px 1px 3px 1px;

      border-radius: 4px;

      background-color: #fafafb;
   }

   ul {
      list-style: none;

      padding: 0;
      margin: 0;

      position: absolute;
      top: 100%;
      left: 0;

      width: 100%;

      border: 1px solid #ccc;
      border-radius: 0 0 2px 2px;
   }

   li {
      padding: 10px;
      cursor: pointer;
      background-color: #ffffff;
      color: #000000;
      transition: background-color 0.3s ease;
   }

   li:hover {
      background-color: #ededed;
   }

   .option {
      display: flex;
      align-items: center;
      gap: 4px;
   }

   .active-option {
      background-color: #ededed;
   }
</style>
