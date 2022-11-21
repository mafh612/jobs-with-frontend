const subscriptions: Map<string, Function> = new Map()

export const publish =
  (key: string) =>
  async (...args: any) => {
    const fn: boolean | Function = subscriptions.has(key) && (subscriptions.get(key) as Function)

    if (fn) fn(...args)
  }
export const subscribe = (key: string, fn: Function): void => {
  subscriptions.set(key, fn)
}
export const unsubscribe = (key: string) => {
  subscriptions.delete(key)
  console.log('subscriptions', subscriptions)
}
