export interface DialogMessage<T> {
  component: 'alert'|'confirm',
  title: string,
  message: string,
  resolve?: (value: T | PromiseLike<T>) => void,
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
  const create = async (options: DialogMessage<any>) => {
    return new Promise<null>((resolve, reject) => {
      stack.value.push(Object.assign(options, {
        resolve: resolve,
        reject: reject
      }))
    }).then(() => {
      stack.value.pop()
    })
  }
  const alertDialog = async (message: string | AlertDialogMessage) => {
    if (typeof message === 'string') {
      return create({
        component: 'alert',
        title: 'Alert',
        message: message
      })
    } else {
      return create(message)
    }
  }
  const confirmDialog = async (message: string | ConfirmDialogMessage) => {
    if (typeof message === 'string') {
      return create({
        component: 'confirm',
        title: 'Confirm',
        message: message
      })
    } else {
      return create(message)
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
