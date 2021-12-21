import { createStore, Store, useStore as useVuexStore } from "vuex";
import type { IRootState, IStoreType } from "@/store/types";

import login from "@/store/login/login";

const store = createStore<IRootState>({
  state: () => {
    return {
      name: "korea",
    };
  },
  actions: {},
  mutations: {},
  getters: {},
  modules: {
    login,
  },
});

export function setupStore() {
  store.dispatch("login/getLocalStorageInit");
}

export function useStore(): Store<IStoreType> {
  return useVuexStore();
}

export default store;
