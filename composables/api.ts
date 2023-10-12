import type { UseFetchOptions } from 'nuxt/app'
import { defu } from 'defu'

export async function useApi<T> (url: string, options: UseFetchOptions<T> = {}) {
  const { $dialog } = useNuxtApp()
  const userAuth = useCookie('access_token')
  const baseURL = process.client ? '/api' : `${process.env.API_BASE_URL}/api`
  const headers: {[key: string]: string} = {
    Accept: 'application/json'
  }

  if (userAuth.value) {
    headers.Authorization = `Bearer ${userAuth.value}`
  }

  const defaults: UseFetchOptions<T> = {
    baseURL: baseURL,
    // cache request
    key: url,

    // set user token if connected
    headers: headers,

    onResponse (_ctx) {
      // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
    },

    async onResponseError ({ request, response, options, error }) {
      if (response.status === 500) {
        await $dialog.alert('에러가 발생했습니다.')
      }
    }
  }

  // for nice deep defaults, please use unjs/defu
  const params = defu(options, defaults)

  return useFetch(url, params)
}
