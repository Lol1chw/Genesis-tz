import axios from 'axios'

export function getAccessToken() {
   const getAccessToken = axios({
      method: 'get',
      url: 'https://test.gnzs.ru/oauth/get-token.php',
      headers: {
         'Content-Type': 'application/json',
         'X-Client-Id': import.meta.env.VITE_X_CLIENT_ID,
         'Access-Control-Allow-Origin': 'https://test.gnzs.ru/oauth/get-token.php'
      }
   })

   return getAccessToken
}
