import { createStore } from "vuex";
import { OrderService } from "@/service/order/order.service";

// declare class AuthService
const orderService = new OrderService();

const orderStore = {
  //Allow modules to have namespace to avoid conflicts with other modules
  namespaced: true,

  state: {
    loading: false,
    order: [],
  },

  mutations: {
    is_loading(state, loading) {
      state.loading = loading;
    },

    setCakeData(state, data) {
      state.order = data;
    },

    updateCakeOrder(state, update) {
      const index = state.order.findIndex((item) => item.id === update.id);
      if (index !== -1) {
        state.order[index] = update;
      }
    },
  },

  getters: {
    //TODO: Computed properties
    isLoading: (state) => state.loading,
    dataOrder: (state) => state.order,
  },

  actions: {
    async getAll({ commit }, { params }) {
      try {
        commit("isLoading", true);
        const queryString = Object.keys(params)
          .map(
            (key) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
          )
          .join("&");
        const response = await orderService.getOrders(
          `/api/admins/orders?${queryString}`
        );
        if (response) {
          commit("setCakeData", response);
          setTimeout(() => {
            commit("isLoading", false);
          }, 1000);
        }
      } catch (error) {
        commit("isLoading", true);
        throw new Error(error.message);
      }
    },

    async orderDetail({ commit }, id) {
      try {
        commit("isLoading", true);
        const response = await orderService.getOrder(
          `/api/admins/order/show/` + id
        );
        if (response) {
          commit("setCakeData", [response]);
          setTimeout(() => {
            commit("isLoading", false);
          }, 1000);
        }
      } catch (error) {
        commit("isLoading", true);
        throw new Error(error.message);
      }
    },

    async updateOrder({ commit }, params) {
      try {
        commit("isLoading", true);
        const response = await orderService.updateOrder(
          `/api/admins/category/order/${params.id}`,
          params
        );
        if (response) {
          commit("updateCakeOrder", response);
          commit("isLoading", false);
        }
      } catch (error) {
        commit("isLoading", true);
        throw new Error(error.message);
      }
    },
  },
};
export default orderStore;
