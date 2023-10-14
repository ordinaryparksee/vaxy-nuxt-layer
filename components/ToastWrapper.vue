<script setup lang="ts">
import Toast from './Toast'
const { $toast } = useNuxtApp()
</script>

<template>
  <div aria-live="assertive" class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <Toast
        v-for="(toast, index) in $toast.stack.value" v-bind:key="toast.id"
        v-bind:title="toast.title" v-bind:message="toast.message" v-bind:level="toast.level"
        v-on:hide="$toast.stack.value.splice(index, 1)"
        v-on:resolve="toast.resolve" v-on:reject="toast.reject"
      ></Toast>
    </div>
  </div>
</template>

<style scoped>

</style>
