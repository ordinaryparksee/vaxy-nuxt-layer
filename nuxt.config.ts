// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  nitro: {
    devProxy: {
      '/api': {
        target: `${process.env.API_BASE_URL}/api`,
        changeOrigin: true
      }
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  modules: ['@nuxtjs/tailwindcss'],
  tailwindcss: {
    exposeConfig: true,
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config',
    // exposeLevel: 2,
    // config: {},
    // injectPosition: 'first',
    viewer: process.env.DEBUG === 'true',
  },
  devtools: {
    enabled: process.env.DEBUG === 'true'
  },
  sourcemap: {
    server: process.env.DEBUG === 'true',
    client: process.env.DEBUG === 'true'
  }
})
