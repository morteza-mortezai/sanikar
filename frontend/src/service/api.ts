import axios, { type AxiosInstance } from 'axios'
import { useAuthStore } from '../stores/auth'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
    $api: AxiosInstance
  }
}

const api: AxiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_BASE  })
const authStore = useAuthStore()

// set token
api.interceptors.request.use((config) => {
  const accessToken = authStore.user?.access_token

  if (accessToken) {
    config.headers.Authorization = 'Bearer ' + accessToken
  }

  return config
})
// api.interceptors.response.use(
//   function (response) {
//     return response
//   },
//   function (error) {
//     return Promise.reject(error)
//   },
// )

export { api }
