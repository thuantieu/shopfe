import { createStore } from "vuex";

export default createStore({
  state: {
    appTitle: "Product List",
    productList: [],
  },
  getters: {},
  mutations: {
    fetchPlist(state, payload) {
      state.productList = payload;
    },
  },
  actions: {
    addproductList(context, payload) {
      let productList = context.state.productList;
      productList = payload;
      context.commit("fetchPlist", productList);
    },
  },
  modules: {},
});
