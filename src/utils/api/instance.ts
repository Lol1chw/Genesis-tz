import axios from 'axios'

const AMOCRM_ACCESS_TOKEN = import.meta.env.VITE_AMOCRM_ACCESS_TOKEN
let AMOCRM_BASE_URL: string = ''

if (process.env.NODE_ENV === 'development') {
   AMOCRM_BASE_URL = 'http://localhost:5173'
} else if (process.env.NODE_ENV === 'production') {
   AMOCRM_BASE_URL = window.location.origin
}

export const api = axios.create({
   baseURL: AMOCRM_BASE_URL,
   headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AMOCRM_ACCESS_TOKEN}`
   },

   withCredentials: false
})
