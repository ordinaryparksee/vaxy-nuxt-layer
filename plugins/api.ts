export default defineNuxtPlugin(async () => {
  const runtimeConfig = useRuntimeConfig()
  const { $dialog } = useNuxtApp()
  const userAuth = useCookie('access_token')
  const baseURL = process.client ? '/api' : `${process.env.API_BASE_URL}/api`
  const headers: {[key: string]: string} = {
    Accept: 'application/json'
  }

  if (userAuth.value) {
    headers.Authorization = `Bearer ${userAuth.value}`
  }

  const instance = $fetch.create({
    baseURL: baseURL,
    headers: headers,
    async onResponseError({ request, response, options, error }) {
      if (response.status === 500) {
        await $dialog.alert('에러가 발생했습니다.')
      }
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
