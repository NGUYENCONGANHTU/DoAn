import { CategoryService } from "@/service/category.service";

// declare class AuthService
const categoryService = new CategoryService();

const categoryStore = {
  //Allow modules to have namespace to avoid conflicts with other modules
  namespaced: true,

  state: {
    loadingApp: false,
    // save cake data
    category: [],
  },

  mutations: {
    isLoading(state, loading) {
      state.loadingApp = loading;
    },

    setCakeData(state, data) {
      state.category = data;
    },

    addCakeCategory(state, newData) {
      state.category = [...state.category, newData];
    },

    updateCakeCategory(state, update) {
      const index = state.category.findIndex((item) => item.id === update.id);
      if (index !== -1) {
        state.category[index] = update;
      }
    },

    deleteCakeCategory(state, id) {
      state.category = state.category.filter((item) => item.id !== id);
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
        const response = await categoryService.getCategories(
          `/api/admins/category?${queryString}`
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

    async categoryDetail({ commit }, { id }) {
      try {
        commit("isLoading", true);
        const response = await categoryService.getCategory(
          `/api/admins/category/show/${id}`
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

    async createCategory({ commit }, params) {
      try {
        commit("isLoading", true);
        const response = await categoryService.createCategory(
          "/api/admins/category/store",
          params
        );
        console.log(response);
        if (response) {
          commit("addCakeCategory", response);
          commit("isLoading", false);
        }
      } catch (error) {
        commit("isLoading", true);
        throw new Error(error.message);
      }
    },

    async updateCategory({ commit }, params) {
      try {
        commit("isLoading", true);
        const response = await categoryService.updateCategory(
          `/api/admins/category/update/${params.id}`,
          params
        );
        if (response) {
          commit("updateCakeCategory", response);
          commit("isLoading", false);
        }
      } catch (error) {
        commit("isLoading", true);
        throw new Error(error.message);
      }
    },

    async deleteCategory({ commit }, id) {
      try {
        commit("isLoading", true);
        const response = await categoryService.deleteCategory(
          `/api/admins/category/destroy/${id}`
        );
        if (response) {
          commit("deleteCakeCategory", response);
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
    dataCategory: (state) => state.category,
    getCategoryById: (state) => (id) => {
      return state.category.find((b) => b.id === id);
    },
  },
};
export default categoryStore;
