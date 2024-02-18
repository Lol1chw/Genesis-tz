import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useSessionStorage } from '@vueuse/core'

import { getById, postEntity } from '@/utils/api'

// I use an explicit type because otherwise a typing bug appears
// https://github.com/vueuse/vueuse/issues/1496
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { RemovableRef } from '@vueuse/core'

export const useDealStore = defineStore('deal', () => {
   const entity = useSessionStorage<Entity[]>('deals', [
      { id: 1, name: 'example', tag: 'Сделка', created_at: 0 }
   ])
   const id = ref<number>(0)
   const isLoading = ref<boolean>(false)
   const leadErrors = ref<LeadError>()

   async function createEntity(endpoint: 'leads' | 'contacts' | 'companies') {
      const tag = endpoint === 'leads' ? 'Сделка' : endpoint === 'contacts' ? 'Контакт' : 'Компания'
      const postEntities: AmoCRMCommonEntity[] = [
         {
            name: (Math.random() + 1).toString(36).substring(7),
            _embedded: {
               tags: [
                  {
                     name: tag
                  }
               ]
            }
         }
      ]

      isLoading.value = true
      await postEntity({
         endpoint: endpoint,
         params: postEntities
      })
         .then(async (response) => {
            id.value = response.data._embedded[endpoint][0].id
            const getByIdResponse = await getById(endpoint, id.value)
            entity.value.push({
               id: id.value,
               name: getByIdResponse.data.name,
               tag: getByIdResponse.data._embedded.tags[0].name,
               created_at: getByIdResponse.data.created_at
            })
         })

         .catch((error: ErrorResponse) => {
            console.log(error)
            leadErrors.value = {
               detail: error.response.data.detail,
               status: error.response.data.status,
               title: error.response.data.title,
               type: error.response.data.type
            }
            alert(JSON.stringify(leadErrors.value, null, 2))
            console.error(error)
            isLoading.value = false
         })
      isLoading.value = false
   }

   return { entity, createEntity, isLoading, leadErrors }
})

type Entity = {
   id: number
   name: string
   created_at: number
   tag: 'Компания' | 'Контакт' | 'Сделка'
}

type LeadError = {
   detail: string
   status: number
   title: string
   type: string
}
