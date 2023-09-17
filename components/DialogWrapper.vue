<script setup lang="ts">
import AlertDialog from './AlertDialog'
import ConfirmDialog from './ConfirmDialog'
const { $dialog } = useNuxtApp()
</script>

<template>
  <div>
    <div v-for="(dialog, index) in $dialog.stack.value" v-bind:key="index">
      <AlertDialog
        v-if="dialog.component === 'alert'"
        v-bind:title="dialog.title" v-bind:message="dialog.message" v-bind:level="dialog.level"
        v-bind:resolve="dialog.resolve" v-bind:reject="dialog.reject"
      ></AlertDialog>
      <ConfirmDialog
        v-else-if="dialog.component === 'confirm'"
        v-bind:title="dialog.title" v-bind:message="dialog.message" v-bind:level="dialog.level"
        v-bind:resolve="dialog.resolve" v-bind:reject="dialog.reject"
      ></ConfirmDialog>
    </div>
  </div>
</template>

<style scoped>

</style>
