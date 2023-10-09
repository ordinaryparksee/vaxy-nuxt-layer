import { ExclamationTriangleIcon  } from '@heroicons/vue/24/outline'

export interface DialogMessage<T> {
  component: 'alert'|'confirm',
  title: string,
  message: string,
  level: 'success'|'info'|'warning'|'danger',
  resolve?: (value: T | PromiseLike<T>) => T,
  reject?: (reason?: any) => void
}
export interface AlertDialogMessage extends DialogMessage<boolean> {
}
export interface ConfirmDialogMessage extends DialogMessage<boolean> {
}

export interface DialogPlugin {
  stack: DialogMessage<any>[]
  create: (options: DialogMessage<any>) => Promise<any>
  alert: (options: AlertDialogMessage) => Promise<boolean>
  confirm: (options: ConfirmDialogMessage) => Promise<boolean>
}

export default defineNuxtPlugin(() => {
  const stack = ref<DialogMessage<any>[]>([])
  const create = async <T> (options: DialogMessage<T>) => {
    const promise: Promise<T> = new Promise((resolve, reject) => {
      stack.value.push(Object.assign(options, {
        resolve: resolve,
        reject: reject
      }))
    })
    promise.then(() => {
      stack.value.pop()
    })
    return promise
  }
  const defaults: {[key: string]: any} = {
    level: 'info'
  }
  const alertDialog = async (message: string | AlertDialogMessage) => {
    const options = {
      ...defaults,
      title: 'Alert',
      component: 'alert',
      message: message
    } as DialogMessage<any>
    if (typeof message === 'string') {
      return create(options)
    } else {
      return create(Object.assign(options, message))
    }
  }
  const confirmDialog = async (message: string | ConfirmDialogMessage) => {
    const options = {
      ...defaults,
      title: 'Confirmation',
      component: 'confirm',
      message: message
    } as DialogMessage<boolean>
    if (typeof message === 'string') {
      return create<boolean>(options)
    } else {
      return create<boolean>(Object.assign(options, message))
    }
  }
  return {
    provide: {
      dialog: {
        stack,
        create,
        alert: alertDialog,
        confirm: confirmDialog
      }
    }
  }
})
