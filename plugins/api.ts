export default defineNuxtPlugin(async () => {
  const runtimeConfig = useRuntimeConfig()
  const userAuth = useCookie('access_token')
  const headers: {[key: string]: string} = {
    Accept: 'application/json'
  }

  if (userAuth.value) {
    headers.Authorization = `Bearer ${userAuth.value}`
  }

  const instance = $fetch.create({
    baseURL: (process.env.APP_ENV === 'local' && process.client) ? '/api' : `${process.env.API_BASE_URL}/api`,
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
