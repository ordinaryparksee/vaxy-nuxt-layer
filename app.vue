<script setup lang="ts">
import DialogWrapper from './components/DialogWrapper'
import ToastWrapper from './components/ToastWrapper'

const { $dialog, $toast } = useNuxtApp()

const confirmTest = async () => {
  const confirmed = await $dialog.confirm('test')
  console.log(`Resolve with '${confirmed}'`)
}

const toastTest = () => {
  $toast.show({
    title: 'Successfully saved.',
    message: 'Anyone with a link can now view this file.'
  }).then(() => {
    console.log('toasted!')
  })
}
</script>

<template>
  <div class="text-center">
    <h1>vaxy-nuxt-layer</h1>
    <div class="mt-1 flex justify-center gap-1">
      <button
        v-on:click="$dialog.alert({
        message: 'test',
      })"
        type="button"
        class="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >Alert</button>
      <button
        v-on:click="confirmTest"
        type="button"
        class="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >Confirm</button>
      <button
        v-on:click="toastTest"
        type="button"
        class="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >Toast</button>
    </div>
  </div>
  <DialogWrapper/>
  <ToastWrapper/>
</template>
