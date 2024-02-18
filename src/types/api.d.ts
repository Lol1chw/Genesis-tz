type ApiRequestConfig = Omit<import('axios').AxiosRequestConfig, 'headers'>

type RequestConfig<Params = undefined> = Params extends undefined
   ? { config?: ApiRequestConfig }
   : { params: Params; config?: ApiRequestConfig }

type AmoCRMCommonEntity = {
   name: string
   _embedded: {
      tags: {
         name: "Компания" | 'Контакт' | 'Сделка'
      }[]
   }
}

type ErrorResponse = {
   response: {
      data: {
         detail: string
         status: number
         title: string
         type: string
      }
   }
}

type AmoCRMCommonResponse = {
   id: number
   name: string
   created_at: number
   _embedded: {
      tags: {
         name: "Компания" | 'Контакт' | 'Сделка'
      }[]
   }
}
