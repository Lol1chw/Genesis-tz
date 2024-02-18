<script setup lang="ts">
   import { ref, watch } from 'vue'
   import MyButton from '@/components/MyButton.vue'
   import MyDropdown from '@/components/MyDropdown.vue'
   import MyTable from '@/components/MyTable.vue'
   import MyTag from '@/components/MyTag.vue'
   import { useDealStore } from '@/stores/amoCrmStore'
   import { formatUnixTimestamp } from '@/utils/format/index'

   import type { Option } from '@/types/dropdown'
   import type { Column } from '@/types/table'
   import type { ColorsTag } from '@/types/tags'

   const columns: Column[] = [
      {
         title: 'Name',
         dataIndex: 'name',
         key: 'name'
      },
      {
         title: 'Id',
         dataIndex: 'id',
         key: 'id'
      },
      {
         title: 'Tag',
         dataIndex: 'tag',
         key: 'tag'
      },
      {
         title: 'Created at',
         dataIndex: 'created_at',
         key: 'created_at'
      }
   ]

   const options = ref<Option[]>([
      { value: 'Не выбрано', label: 'Не выбрано' },
      { value: 'Сделка', label: 'Сделка' },
      { value: 'Контакт', label: 'Контакт' },
      { value: 'Компания', label: 'Компания' }
   ])

   const active = ref<boolean>(false)
   const selectedOption = ref<Option>({ value: 'Не выбрано', label: 'Не выбрано' })

   function selectOption(option: Option) {
      selectedOption.value = option
   }

   watch(selectedOption, (selectedOption) => {
      if (selectedOption.label !== 'Не выбрано') {
         active.value = true
      } else {
         active.value = false
      }
   })

   const dealStore = useDealStore()

   function handleCreate(selectedOption: Option['label']) {
      if (selectedOption === 'Сделка') {
         dealStore.createEntity('leads')
      }

      if (selectedOption === 'Контакт') {
         dealStore.createEntity('contacts')
      }

      if (selectedOption === 'Компания') {
         dealStore.createEntity('companies')
      } else {
         return null
      }
   }

   function handleTagColor(tag: 'Сделка' | 'Контакт' | 'Компания'): ColorsTag {
      if (tag === 'Сделка') {
         return 'green'
      }
      if (tag === 'Контакт') {
         return 'pink'
      }
      else {
         return 'blue'
      }
   }
</script>

<template>
  <MyDropdown
    :options="options"
    :selected-option="selectedOption"
    @select-option="selectOption"
  >
    <template #prefix>
      Формат: {{ selectedOption.label }}
    </template>
  </MyDropdown>

  <MyTable
    :columns="columns"
    :data-source="dealStore.entity"
  >
    <template #bodyCell="{ record, column }">
      <template v-if="column.key === 'name'">
        <span class="name">{{ record[column.dataIndex] }}</span>
      </template>
      <template v-if="column.key === 'tag'">
        <MyTag
          :color="handleTagColor(record[column.dataIndex])"
        >
          {{ record[column.dataIndex] }}
        </MyTag>
      </template>
      <template v-if="column.key === 'created_at'">
        {{ formatUnixTimestamp(record[column.dataIndex]) }}
      </template>
    </template>
  </MyTable>

  <div class="wrapper-button">
    <MyButton
      :active="active"
      :is-loading="dealStore.isLoading"
      @click="handleCreate(selectedOption.label)"
    >
      Создать
    </MyButton>
  </div>
</template>

<style scoped>
   .wrapper-button {
      display: flex;
      justify-content: flex-end;

      margin-top: 10px;
   }

   .name {
      color: #1677ff;
   }
</style>
