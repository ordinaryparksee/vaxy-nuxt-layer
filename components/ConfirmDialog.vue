<script setup lang="ts">
import { theme } from '#tailwind-config'
import {
  CheckIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/vue/24/outline'
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue'

const props = defineProps<{
  level: string,
  title: string,
  message: string
}>()

const emits = defineEmits(['show', 'hide', 'resolve', 'reject'])

const isOpen = ref<boolean>(true)
const reolveValue = ref<boolean>(false)

function resolve(value: boolean) {
  isOpen.value = false
  reolveValue.value = value
}

function afterResolve () {
  emits('hide')
  emits('resolve', reolveValue.value)
}
</script>

<template>
  <TransitionRoot as="template" v-bind:show="isOpen" v-on:after-leave="afterResolve">
    <Dialog as="div" class="relative z-10">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              <div>
                <div v-if="level === 'success'" class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <CheckIcon class="text-green-600 h-6 w-6" aria-hidden="true" />
                </div>
                <div v-else-if="level === 'warning'" class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                  <ExclamationTriangleIcon class="text-yellow-600 h-6 w-6" aria-hidden="true" />
                </div>
                <div v-else-if="level === 'danger'" class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <ExclamationCircleIcon class="text-red-600 h-6 w-6" aria-hidden="true" />
                </div>
                <div
                  v-else-if="level === 'info'"
                  v-bind:class="[theme?.extend?.colors?.primary ? 'bg-primary-100' : 'bg-indigo-100']"
                  class="mx-auto flex h-12 w-12 items-center justify-center rounded-full"
                >
                  <InformationCircleIcon
                    v-bind:class="[theme?.extend?.colors?.primary ? 'text-primary-600' : 'text-indigo-600']"
                    class="h-6 w-6" aria-hidden="true"
                  />
                </div>
                <div v-else>
                  <slot name="header"/>
                </div>
              </div>
              <div class="mt-3 text-center sm:mt-5">
                <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">{{ props.title }}</DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">{{ props.message  }}</p>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:gap-1 sm:flex-row-reverse">
                <button
                  v-if="level === 'success'" v-on:click="resolve(true)" type="button"
                  class="bg-green-700 hover:bg-green-600 focus-visible:outline-green-700 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto"
                >Yes</button>
                <button
                  v-else-if="level === 'warning'" v-on:click="resolve(true)" type="button"
                  class="bg-yellow-600 hover:bg-yellow-500 focus-visible:outline-yellow-600 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto"
                >Yes</button>
                <button
                  v-else-if="level === 'danger'" v-on:click="resolve(true)" type="button"
                  class="bg-red-600 hover:bg-red-500 focus-visible:outline-red-600 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto"
                >Yes</button>
                <button
                  v-else
                  v-on:click="resolve(true)"
                  v-bind:class="[theme?.extend?.colors?.primary ? 'bg-primary-600 hover:bg-primary-500 focus-visible:outline-primary-600' : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600']"
                  type="button"
                  class="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto"
                >Yes</button>
                <button
                  v-on:click="resolve(false)"
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >No</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped>

</style>
