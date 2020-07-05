import Vue from "vue";
import Vuex from "vuex";
import { mergeAll } from "lodash/fp";

Vue.use(Vuex);

const req = require.context("./app", true, /store\.ts$/);
const stores = req.keys().flatMap((filename): {} => req(filename).default);

export default new Vuex.Store({
  state: {
    width: 0
  },
  getters: {
    isMobile(state): boolean {
      return state.width < 600;
    }
  },
  mutations: {
    setWidth(state, newWidth): void {
      state.width = newWidth;
    }
  },
  actions: {},
  modules: mergeAll(stores)
});
