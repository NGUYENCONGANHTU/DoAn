import { createStore } from "vuex";
import { OrderDetailService } from "@/service/order/order-detail.service";

// declare class AuthService
const orderDetailService = new OrderDetailService();

const orderDetailStore = {
  //Allow modules to have namespace to avoid conflicts with other modules
  namespaced: true,

  state: {
    loading: false,
    orderDetail: [],
  },

  mutations: {
    is_loading(state, loading) {
      state.loading = loading;
    },

    setCakeData(state, data) {
      state.orderDetail = data;
    },
  },

  getters: {
    //TODO: Computed properties
    isLoading: (state) => state.loading,
    dataOrderDetail: (state) => state.orderDetail,
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
        const response = await orderDetailService.getOrderDetails(
          `/api/admins/order_details?${queryString}`
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
  },
};
export default orderDetailStore;
