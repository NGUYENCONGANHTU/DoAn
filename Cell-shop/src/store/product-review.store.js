import { createStore } from "vuex";
import { ProductReviewService } from "@/service/product-review.service";

// declare class AuthService
const productReviewService = new ProductReviewService();

const productReviewStore = {
  //Allow modules to have namespace to avoid conflicts with other modules
  namespaced: true,

  state: {
    loading: false,
    productReview: [],
  },

  mutations: {
    is_loading(state, loading) {
      state.loading = loading;
    },

    setCakeData(state, data) {
      state.productReview = data;
    },
  },

  getters: {
    //TODO: Computed properties
    isLoading: (state) => state.loading,
    dataOrderDetail: (state) => state.productReview,
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
        const response = await productReviewService.getProductReviews(
          `/api/admins/product_reviews?${queryString}`
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
export default productReviewStore;
