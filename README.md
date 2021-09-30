# vue3-persistedstore

VUE3 全局数据存储 & 界面刷新缓存机制

<hr />

[![NPM version](https://img.shields.io/npm/v/vue3-persistedstore.svg)](https://www.npmjs.com/package/vue3-persistedstore)
[![NPM downloads](https://img.shields.io/npm/dm/vue3-persistedstore.svg)](https://www.npmjs.com/package/vue3-persistedstore)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![MIT license](https://img.shields.io/github/license/Tinolee615/vue3-persistedstore.svg)](https://github.com/Tinolee615/vue3-persistedstore/blob/main/LICENSE)

## Install

```bash
npm install --save vue3-persistedstore
  or
yarn add vue3-persistedstore -S
```

## Init

``` js
// store/index.ts
import createPersistedStore from 'vue3-persistedstate'
import xxx from './moudles/xxx'
export default createPersistedStore({
  key: 'client',
  storage: window.sessionStorage,
  modules: {
    xxx
  }
})
```

## Examples

``` js
// modules/UserStore.ts
import { reactive } from 'vue'
import { IStore } from 'vue3-persistedstate'

declare interface UserUpdate {
  updateCount: Function
}

declare interface IUserState {
  count: number
}

const state: IUserState = reactive({
  count: 0
})

const store: IStore<IUserState, UserUpdate> = {
  persistedState: true,
  state: state,
  update: {
    updateCount: (data) => {
      state.count = data
    }
  }
}

export default store
export { state, IUserState, UserUpdate }

// store/index.ts
import createPersistedStore from 'vue3-persistedstate'
import UserStore from './moudles/UserStore'
export default createPersistedStore({
  key: 'client',
  storage: window.sessionStorage,
  modules: {
    UserStore
  }
})

// main.ts
import store from './store/index'
app.use(store)

// demo.tsx
import { IUserState, UserUpdate } from '@/store/moudles/UserStore'
import { IStore } from 'vue3-persistedstore'
export default defineComponent({
  name: 'Demo',
  setup: () => {
    const userStore = inject('UserStore') as IStore<IUserState, UserUpdate>
    // userStore.state.count
    // userStore.update.updateCount(data)
  }
})

```


## API

### `createPersistedStore([options])`

- `key <String>`: store模块命名空间，默认: `@@normal`。
- `storage <Storage>`: 数据持久化存储方式，`window.sessionStorage | window.localStorage`， 默认: `window.localStorage`.
- `modules <object>`: store模块，默认: `{}`。

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
