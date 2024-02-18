<script setup lang="ts">
   import { computed, ref } from 'vue'
   import type { Column } from '@/types/table'

   const props = defineProps<{
      columns: Column[]
      dataSource: any[]
   }>()

   defineEmits<{
      (e: 'edit', record: any): void
   }>()

   const itemsPerPage = 10
   const currentPage = ref(1)

   const totalPages = ref(Math.ceil(props.dataSource.length / itemsPerPage))

   const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage
      const end = start + itemsPerPage
      return props.dataSource.slice(start, end)
   })

   const changePage = (page: number) => {
      if (page >= 1 && page <= totalPages.value) {
         currentPage.value = page
      }
   }
</script>

<template>
  <div class="custom-table">
    <table>
      <thead>
        <tr>
          <template
            v-for="column in columns"
            :key="column.key"
          >
            <th>
              <slot
                name="headerCell"
                :column="column"
              >
                {{ column.title }}
              </slot>
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(record, index) in paginatedData"
          :key="record.id"
          :class="{ 'last-row': index === paginatedData.length - 1 }"
        >
          <template
            v-for="column in columns"
            :key="column.key"
          >
            <td>
              <slot
                name="bodyCell"
                :column="column"
                :record="record"
              >
                {{ record[column.dataIndex] }}
              </slot>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="pagination">
    <button
      v-for="page in totalPages"
      :key="page"
      :disabled="page === currentPage"
      :class="{ 'pagination__buton--active': page !== currentPage }"
      @click="changePage(page)"
    >
      {{ page }}
    </button>
  </div>
</template>

<style scoped>
   .custom-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 16px;
   }

   .custom-table th,
   .custom-table td {
      padding: 12px;
      border: 1px solid #e8e8e8;
      text-align: left;

      min-width: 150px;
   }

   .custom-table th {
      background-color: #fafafa;
      font-weight: 500;
      color: #000000;
   }

   .custom-table td {
      color: #000000;
   }

   .custom-table a {
      color: #1890ff;
   }

   .custom-table .action-button {
      background-color: #1890ff;
      color: #fff;
      border: none;
      padding: 8px 16px;
      cursor: pointer;
      border-radius: 4px;
      font-size: 14px;
   }

   .custom-table .action-button:hover {
      background-color: #096dd9;
   }

   .custom-table th:first-child {
      border-top-left-radius: 10px;
   }

   .custom-table th:last-child {
      border-top-right-radius: 10px;
   }

   .custom-table .last-row td:first-child {
      border-bottom-left-radius: 10px;
   }

   .custom-table .last-row td:last-child {
      border-bottom-right-radius: 10px;
   }

   .pagination {
      display: flex;
      justify-content: flex-end;

      margin: 5px;
   }

   .pagination__buton--active {
      color: #1677ff;

      background-color: #ffffff;

      border-radius: 4px;
      border: 1px solid #1677ff;
      cursor: pointer;
   }

   .pagination__buton--active:hover {
      opacity: 0.5;
   }
</style>
