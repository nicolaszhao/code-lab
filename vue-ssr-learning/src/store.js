import Vue from 'vue';
import Vuex from 'vuex';
import { fetchProduct } from "./api";

Vue.use(Vuex);

export  function createStore() {
  return new Vuex.Store({
    state: {
      products: {},
    },
    mutations: {
      setProduct(state, { id, product }) {
        state.products = {
          ...state.products,
          id: product,
        };
      },
    },
    actions: {
      async fetchProduct({ commit }, id) {
        const product = await fetchProduct(id);
        commit('setProduct', { id, product });
      },
    },
  });
}
