import { createStore } from "vuex";

export default createStore({
  state: {
    appTitle: "Product List",
    productList: [],
    cart: [],
    token: {}
  },
  getters: {},
  mutations: {
    fetchPlist(state, payload) {
      state.productList = payload;
    },
    fetchCart(state, payload) {
      state.cart = payload;
    },
    pushToken(state, payload) {
      state.token = payload
    }
  },
  actions: {
    addproductList(context, payload) {
      let productList = context.state.productList;
      productList = payload;
      context.commit("fetchPlist", productList);
    },
    addToCart(context, payload) {
      let cartList = context.state.cart;
      cartList.push(payload);
      context.commit("fetchCart", cartList);
    },
    updateCart(context, payload) {
      let cartList = context.state.cart;
      cartList = payload;
      context.commit("fetchCart", cartList);
    },
    clearCart(context, payload) {
      let cartList = context.state.cart;
      cartList = [];
      context.commit("fetchCart", cartList);
    },
    getTokent(context, payload) {
      let token = context.state.token
      token = payload
      context.commit("pushToken", token)
    }
  },
  modules: {},
});
