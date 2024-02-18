declare global {
   namespace NodeJS {
      interface ProcessEnv {
         readonly VITE_AMOCRM_DOMAIN: string
         readonly VITE_AMOCRM_ACCESS_TOKEN: string
         NODE_ENV: 'development' | 'production'
         PORT?: string
         PWD: string
      }
   }
}

export {}
