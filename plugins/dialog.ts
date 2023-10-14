export interface DialogMessage<T> {
  id: symbol,
  component: 'alert'|'confirm',
  title: string,
  message: string,
  level?: 'success'|'info'|'warning'|'danger',
  resolve?: (value: T | PromiseLike<T>) => T,
  reject?: (reason?: any) => void
}

export interface AlertDialogMessage extends DialogMessage<boolean> {
}

export interface ConfirmDialogMessage extends DialogMessage<boolean> {
}

export interface DialogPlugin {
  stack: DialogMessage<any>[]
  show: (options: DialogMessage<any>) => Promise<any>
  alert: (options: AlertDialogMessage) => Promise<boolean>
  confirm: (options: ConfirmDialogMessage) => Promise<boolean>
}

export default defineNuxtPlugin(() => {
  const stack = ref<DialogMessage<any>[]>([])
  const show = async <T> (options: DialogMessage<T>) => {
    return new Promise<T>((resolve, reject) => {
      stack.value.push(Object.assign(options, {
        id: Symbol(),
        resolve: resolve,
        reject: reject
      }))
    })
  }
  const defaults: {[key: string]: any} = {
  }
  const alertDialog = async (message: string | AlertDialogMessage) => {
    const options = {
      ...defaults,
      title: 'Alert',
      component: 'alert',
      message: message
    } as DialogMessage<any>
    if (typeof message === 'string') {
      return show(options)
    } else {
      return show(Object.assign(options, message))
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
      return show<boolean>(options)
    } else {
      return show<boolean>(Object.assign(options, message))
    }
  }
  return {
    provide: {
      dialog: {
        stack,
        show,
        alert: alertDialog,
        confirm: confirmDialog
      }
    }
  }
})
