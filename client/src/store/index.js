import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    display_name: "",
    banners: [],
    filteredProduct: []
  },
  mutations: {
    GET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    SET_DISPLAY_NAME(state, payload) {
      state.display_name = payload;
    },
    UPDATE_PRODUCTS(state, payload) {
      state.products = [];
    },
    GET_BANNERS(state, payload) {
      state.banners = payload;
    },
    UPDATE_BANNERS(state, payload) {
      state.banners = [];
    },
    FILTER_PRODUCT(state, payload) {
      state.filteredProduct = [];
      for (let i = 0; i < state.products.length; i++) {
        if (state.products[i].category_name === payload) {
          state.filteredProduct.push(state.products[i]);
        }
      }
    }
  },
  actions: {
    getProducts(context, payload) {
      axios({
        method: "GET",
        url: "https://api-e-commerce-cms.herokuapp.com/products",
        headers: { access_token: localStorage.access_token }
      })
        .then(result => {
          if (result.status === 200) {
            context.commit("GET_PRODUCTS", result.data);
          } else {
            console.log(result);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteProduct(context, { id }) {
      axios({
        method: "DELETE",
        url: `https://api-e-commerce-cms.herokuapp.com/products/${id}`,
        headers: { access_token: localStorage.access_token }
      })
        .then(result => {
          if (result.status === 200) {
            context.commit("UPDATE_PRODUCTS");
            context.dispatch("getProducts");
          } else {
            console.log(result);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    addProduct(context, payload) {
      axios({
        method: "POST",
        url: "https://api-e-commerce-cms.herokuapp.com/products",
        headers: {
          "Content-type": "application/json",
          access_token: localStorage.access_token
        },
        data: payload
      })
        .then(result => {
          if (result.status === 201) {
            router.push({ path: "/home" });
          } else {
            console.log(result);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    editProduct(context, payload) {
      axios({
        method: "PUT",
        url: `https://api-e-commerce-cms.herokuapp.com/products/${payload.id}`,
        headers: {
          "Content-type": "application/json",
          access_token: localStorage.access_token
        },
        data: payload.data
      })
        .then(result => {
          if (result.status === 200) {
            context.commit("UPDATE_PRODUCTS");
            context.dispatch("getProducts");
            router.push({ path: "/home" });
          } else {
            console.log(result);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    postLogin(context, payload) {
      axios({
        method: "POST",
        url: "https://api-e-commerce-cms.herokuapp.com/users/login",
        headers: {
          "Content-type": "application/json"
        },
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(result => {
          if (result.status === 201) {
            context.commit("SET_DISPLAY_NAME", result.data.display_name);
            localStorage.setItem("access_token", result.data.access_token);
            router.push({ path: "/home" });
          } else {
            console.log("Wrong password/email");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getBanners(context, payload) {
      axios({
        method: "GET",
        url: "https://api-e-commerce-cms.herokuapp.com/banners",
        headers: { access_token: localStorage.access_token }
      })
        .then(result => {
          if (result.status === 200) {
            context.commit("GET_BANNERS", result.data);
          } else {
            console.log(result);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeStatus(context, payload) {
      console.log(payload);
      axios({
        method: "PATCH",
        url: `https://api-e-commerce-cms.herokuapp.com/banners/${payload.id}`,
        headers: {
          "Content-type": "application/json",
          access_token: localStorage.access_token
        },
        data: {
          is_active: payload.data
        }
      })
        .then(result => {
          if (result.status === 200) {
            context.commit("UPDATE_BANNERS");
            context.dispatch("getBanners");
          } else {
            console.log(result);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteBanner(context, payload) {
      axios({
        method: "DELETE",
        url: `https://api-e-commerce-cms.herokuapp.com/banners/${payload}`,
        headers: { access_token: localStorage.access_token }
      })
        .then(result => {
          if (result.status === 200) {
            context.commit("UPDATE_BANNERS");
            context.dispatch("getBanners");
          } else {
            console.log(result);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    addBanner(context, payload) {
      axios({
        method: "POST",
        url: "https://api-e-commerce-cms.herokuapp.com/banners",
        headers: {
          "Content-type": "application/json",
          access_token: localStorage.access_token
        },
        data: payload
      })
        .then(result => {
          if (result.status === 201) {
            router.push({ path: "/home/banners" });
          } else {
            console.log(result);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    filterProduct(context, payload) {
      context.dispatch("getProducts");
      context.commit("FILTER_PRODUCT", payload)
    }
  },
  getters: {},
  modules: {}
});
