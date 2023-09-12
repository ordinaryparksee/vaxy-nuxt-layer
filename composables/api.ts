import type { UseFetchOptions } from 'nuxt/app'
import { defu } from 'defu'

export async function useApi<T> (url: string, options: UseFetchOptions<T> = {}) {
    const userAuth = useCookie('access_token')

    const defaults: UseFetchOptions<T> = {
        baseURL: process.client ? '/api' : `${process.env.API_BASE_URL}/api`,
        // cache request
        key: url,

        // set user token if connected
        headers: userAuth.value
            ? { Authorization: `Bearer ${userAuth.value}` }
            : {},

        onResponse (_ctx) {
            // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
        },

        onResponseError (_ctx) {
            // throw new myBusinessError()
        }
    }

    // for nice deep defaults, please use unjs/defu
    const params = defu(options, defaults)

    return useFetch(url, params)
}

export async function useApiData<T> (url: string, options: UseFetchOptions<T> = {}) {
    const response = await useApi(url, options)
    return response.data.value
}
