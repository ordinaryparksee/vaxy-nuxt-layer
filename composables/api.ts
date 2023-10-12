import type { AsyncData, FetchResult, UseFetchOptions } from 'nuxt/app'
import { defu } from 'defu'
import { FetchError } from 'ofetch'
import { AvailableRouterMethod, NitroFetchRequest } from 'nitropack'
import { KeysOf, PickFrom } from '#app/composables/asyncData'

export async function useApi<
  ResT = void,
  ErrorT = FetchError,
  ReqT extends NitroFetchRequest = NitroFetchRequest,
  Method extends AvailableRouterMethod<ReqT> = ResT extends void ? 'get' extends AvailableRouterMethod<ReqT> ? 'get' : AvailableRouterMethod<ReqT> : AvailableRouterMethod<ReqT>,
  _ResT = ResT extends void ? FetchResult<ReqT, Method> : ResT,
  DataT = _ResT, PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
  DefaultT = null
> (url: string, opts?: UseFetchOptions<_ResT, DataT, PickKeys, DefaultT, ReqT, Method>): Promise<AsyncData<PickFrom<DataT, PickKeys> | DefaultT, ErrorT | null>> {
  const userAuth = useCookie('access_token')
  const baseURL = process.client ? '/api' : `${process.env.API_BASE_URL}/api`
  const headers: {[key: string]: string} = {
    Accept: 'application/json'
  }

  if (userAuth.value) {
    headers.Authorization = `Bearer ${userAuth.value}`
  }

  const defaults: UseFetchOptions<_ResT, DataT, PickKeys, DefaultT, ReqT, Method> = {
    baseURL: baseURL,

    // cache request
    key: url,

    // set user token if connected
    headers: headers,

    onResponse (_ctx) {
      // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
    },

    onResponseError (_ctx) {
      // throw new myBusinessError()
    }
  }

  // for nice deep defaults, please use unjs/defu
  const params = defu(opts, defaults)

  return useFetch(url, params)
}
