<script setup lang="ts">
const props = defineProps<{
  title: string,
  message: string,
  resolve?: (value: boolean | PromiseLike<boolean>) => void,
  reject?: (reason?: boolean) => void
}>()
const isOpen = ref(true)

function resolve(value: boolean) {
  isOpen.value = false
  if (props.resolve) {
    props.resolve(value)
  }
}
</script>

<template>
  <div>
    <TairoModal v-bind:open="isOpen" size="sm">
      <template #header>
        <!-- Header -->
        <div class="flex w-full items-center justify-between p-4 md:p-6">
          <h3 class="font-heading text-muted-900 text-lg font-medium leading-6 dark:text-white">
            {{ props.title }}
          </h3>

          <BaseButtonClose v-on:click="resolve(false)" />
        </div>
      </template>

      <!-- Body -->
      <div class="p-4 md:p-6">
        <div class="mx-auto w-full max-w-xs text-center">
          <p class="font-alt text-muted-500 dark:text-muted-400 text-sm">{{ props.message }}</p>
          <slot/>
        </div>
      </div>

      <template #footer>
        <!-- Footer -->
        <div class="p-4 md:p-6">
          <div class="flex gap-x-2">
            <BaseButton v-on:click="resolve(false)">Decline</BaseButton>
            <BaseButton color="primary" flavor="solid" v-on:click="resolve(true)">Accept</BaseButton>
          </div>
        </div>
      </template>
    </TairoModal>
  </div>
</template>

<style scoped>

</style>
