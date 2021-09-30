import createPersistedStore from "../src";

it('can be created with the default options', () => {
  expect(() => createPersistedStore()).not.toThrow();
})

it('can be created with the user options', () => {
  expect(() => createPersistedStore({
    key: 'client',
    storage: window.sessionStorage,
    modules: {}
  })).not.toThrow();
})