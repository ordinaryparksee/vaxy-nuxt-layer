<script setup lang="ts">
import { theme } from '#tailwind-config'
import {
  CheckCircleIcon, InformationCircleIcon, ExclamationTriangleIcon, ExclamationCircleIcon
} from '@heroicons/vue/24/outline'
import { XMarkIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{
  title: string,
  message?: string,
  level?: string,
  timeout?: number
}>()

const emits = defineEmits(['show', 'hide', 'resolve', 'reject'])

const show = ref(false)

function close () {
  show.value = false
}

function afterHide () {
  emits('hide')
  emits('resolve')
}

onMounted(() => {
  show.value = true
  emits('show')
  setTimeout(() => {
    close()
  }, props.timeout || 3000)
})
</script>

<template>
  <transition
    v-on:after-leave="afterHide"
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="show" class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <CheckCircleIcon v-if="level === 'success'" class="h-6 w-6 text-green-600" aria-hidden="true" />
            <ExclamationTriangleIcon v-else-if="level === 'warning'" class="h-6 w-6 text-yellow-600" aria-hidden="true" />
            <ExclamationCircleIcon v-else-if="level === 'danger'" class="h-6 w-6 text-red-600" aria-hidden="true" />
            <InformationCircleIcon
              v-else
              v-bind:class="[theme?.extend?.colors?.primary ? 'text-primary-600' : 'text-indigo-600']"
              class="h-6 w-6" aria-hidden="true"
            />
          </div>
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p v-if="props.title" class="text-sm font-medium text-gray-900">{{props.title}}</p>
            <p v-if="props.message" class="mt-1 text-sm text-gray-500">{{props.message}}</p>
          </div>
          <div class="ml-4 flex flex-shrink-0">
            <button type="button" v-on:click="close" class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <span class="sr-only">Close</span>
              <XMarkIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>

</style>
