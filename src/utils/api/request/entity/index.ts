import { api } from '../../instance'

function getById(endpoint: string, id: number) {
   return api.get<AmoCRMCommonResponse>(`/${endpoint}/${id}`)
}

function postEntity({ endpoint, params, config }: postLeadConfig) {
   return api.post<postLeadData>(`${endpoint}`, params, config)
}

export { getById, postEntity }

type postLeadConfig = RequestConfig<AmoCRMCommonEntity[]> & {
   endpoint: string
}

type postLeadData = {
   _embedded: {
      [key in KeyOption]: {
         id: number
         request_id: string
         _links: {
            self: {
               href: string
            }
         }
      }[]
   }
}

type KeyOption = 'leads' | 'contacts' | 'companies'