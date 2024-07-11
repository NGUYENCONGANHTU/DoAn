import { TrademarkService } from "@/service/trademark.service";

// declare class AuthService
const trademarkService = new TrademarkService();

const trademarkStore = {
  //Allow modules to have namespace to avoid conflicts with other modules
  namespaced: true,

  state: {
    loadingApp: false,
    // save cake data
    trademark: [],
  },

  mutations: {
    isLoading(state, loading) {
      state.loadingApp = loading;
    },

    setCakeData(state, data) {
      state.trademark = data;
    },

    addCakeTrademark(state, newData) {
      state.trademark = [...state.trademark, newData];
    },

    updateCakeTrademark(state, update) {
      const index = state.trademark.findIndex((item) => item.id === update.id);
      if (index !== -1) {
        state.trademark[index] = update;
      }
    },

    deleteCakeTrademark(state, id) {
      state.trademark = state.trademark.filter((item) => item.id !== id);
    },
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
        const response = await trademarkService.getTrademarks(
          `/api/admins/trademark?${queryString}`
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

    async trademarkDetail({ commit }, { id }) {
      try {
        commit("isLoading", true);
        const response = await trademarkService.getTrademark(
          `/api/admins/trademark/show/${id}`
        );
        if (response) {
          commit("setCakeData", [response]);
          commit("isLoading", false);
        }
      } catch (error) {
        commit("isLoading", true);
        throw new Error(error.message);
      }
    },

    async createTrademark({ commit }, params) {
      try {
        commit("isLoading", true);
        const response = await trademarkService.createTrademark(
          "/api/admins/trademark/store",
          params
        );
        console.log(response);
        if (response) {
          commit("addCakeTrademark", response);
          commit("isLoading", false);
        }
      } catch (error) {
        commit("isLoading", true);
        throw new Error(error.message);
      }
    },

    async updateTrademark({ commit }, params) {
      try {
        commit("isLoading", true);
        const response = await trademarkService.updateTrademark(
          `/api/admins/trademark/update/${params.id}`,
          params
        );
        if (response) {
          commit("updateCakeTrademark", response);
          commit("isLoading", false);
        }
      } catch (error) {
        commit("isLoading", true);
        throw new Error(error.message);
      }
    },

    async deleteTrademark({ commit }, id) {
      try {
        commit("isLoading", true);
        const response = await trademarkService.deleteTrademark(
          `/api/admins/trademark/destroy/${id}`
        );
        if (response) {
          commit("deleteCakeTrademark", id);
          commit("isLoading", false);
        }
      } catch (error) {
        commit("isLoading", true);
        throw new Error(error.message);
      }
    },
  },

  getters: {
    //TODO: Computed properties
    loadData: (state) => state.loadingApp,
    dataTrademark: (state) => state.trademark,
    getTrademarkById: (state) => (id) => {
      return state.trademark.find((b) => b.id === id);
    },
  },
};
export default trademarkStore;
