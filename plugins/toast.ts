export interface ToastMessage<T> {
  id: symbol,
  title: string,
  message: string,
  level?: 'success'|'info'|'warning'|'danger',
  resolve?: (value: T | PromiseLike<T>) => T,
  reject?: (reason?: any) => void
}

export interface ToastPlugin {
  stack: ToastMessage<any>[]
  show: (options: ToastMessage<any>) => Promise<any>
}

export default defineNuxtPlugin(() => {
  const stack = ref<ToastMessage<any>[]>([])
  const show = async <T> (options: ToastMessage<T>) => {
    return new Promise<T>((resolve, reject) => {
      stack.value.push(Object.assign(options, {
        id: Symbol(),
        resolve: resolve,
        reject: reject
      }))
    })
  }
  return {
    provide: {
      toast: {
        stack,
        show
      }
    }
  }
})
