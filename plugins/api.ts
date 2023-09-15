export default defineNuxtPlugin(async () => {
  const runtimeConfig = useRuntimeConfig()
  const userAuth = useCookie('access_token')
  const baseURL = (process.env.APP_DEBUG === 'true' && process.client) ? '/api' : `${process.env.API_BASE_URL}/api`
  const headers: {[key: string]: string} = {
    Accept: 'application/json'
  }

  if (userAuth.value) {
    headers.Authorization = `Bearer ${userAuth.value}`
  }

  const instance = $fetch.create({
    baseURL: baseURL,
    headers: {
      Accept: 'application/json'
    }
  })

  // You can also just do this instead of returning
  // nuxtApp.provide('ofetch', instance)

  return {
    provide: {
      api: instance
    }
  }
})
