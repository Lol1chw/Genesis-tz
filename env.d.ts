/// <reference types="vite/client" />

interface ImportMetaEnv {
   readonly VITE_AMOCRM_DOMAIN: string
   readonly VITE_AMOCRM_ACCESS_TOKEN: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}