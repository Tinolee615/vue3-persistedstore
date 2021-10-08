import { App, watch } from 'vue'

declare interface IStore<State, Update> {
  persistedState: boolean // 是否开启持久化
  state: State
  update: Update
}

declare interface Storage {
  getItem: (key: string) => any
  setItem: (key: string, value: any) => void
  removeItem: (key: string) => void
}

declare interface Options {
  modules: object
  storage?: Storage
  key?: string
}

export default (options?: Options): ((app: App) => void) => {
  debugger
  options = options || ({} as Options)
  const storage = options.storage || (window && window.localStorage)
  const storeKey = (options.key && `@@${options.key}`) || '@@normal'
  const Stores = options.modules || {}
  return (app: App) => {
    const keys = Stores && Object.keys(Stores)
    keys &&
      keys.forEach((item: string) => {
        app.provide(item, Stores[item])
        if (Stores[item].persistedState) {
          const storageState = JSON.parse(storage.getItem(`${storeKey}/${item}`) || '{}')
          for (const key in storageState) {
            Stores[item].state[key] = storageState[key]
          }

          watch(
            () => Stores[item].state,
            () => {
              storage.setItem(`${storeKey}/${item}`, JSON.stringify(Stores[item].state))
            },
            { deep: true }
          )
        }
      })
  }
}

export { IStore }
