<script setup lang="ts">
import DialogWrapper from './components/DialogWrapper'

const { $dialog } = useNuxtApp()

const confirmTest = async () => {
  const confirmed = await $dialog.confirm('test')
  console.log(confirmed)
}
</script>

<template>
  <h1>vaxy-nuxt-layer</h1>
  <div>
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
  </div>
  <DialogWrapper/>
</template>
