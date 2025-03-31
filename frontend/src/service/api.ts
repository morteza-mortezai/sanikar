import axios, { type AxiosInstance } from 'axios'
import { useAuthStore } from '../stores/auth'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
    $api: AxiosInstance
  }
}

const api: AxiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_BASE  })

// set token
api.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  const accessToken = authStore.user?.token || ''

  if (accessToken) {
    config.headers.Authorization = 'Bearer ' + accessToken
    // config.withCredentials=true
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
