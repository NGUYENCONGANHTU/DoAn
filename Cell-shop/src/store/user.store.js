import { createStore } from "vuex";
import { UserService } from "@/service/user.service";

// declare class AuthService
const userService = new UserService();

const userStore = {
  //Allow modules to have namespace to avoid conflicts with other modules
  namespaced: true,

  state: {
    loading: false,
    user: [],
  },

  mutations: {
    is_loading(state, loading) {
      state.loading = loading;
    },

    setCakeData(state, data) {
      state.user = data;
    },

    updateCakeUser(state, update) {
      const index = state.user.findIndex((item) => item.id === update.id);
      if (index !== -1) {
        state.user[index] = update;
      }
    },
  },

  getters: {
    //TODO: Computed properties
    isLoading: (state) => state.loading,
    dataUser: (state) => state.user,
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
        const response = await userService.getUsers(
          `/api/admins/users?${queryString}`
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

    async userDetail({ commit }, id) {
      try {
        commit("isLoading", true);
        const response = await userService.getUser(
          `/api/admins/user/show/` + id
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

    async updateUser({ commit }, params) {
      try {
        commit("isLoading", true);
        const response = await userService.updateUser(
          `/api/admins/category/user/${params.id}`,
          params
        );
        if (response) {
          commit("updateCakeUser", response);
          commit("isLoading", false);
        }
      } catch (error) {
        commit("isLoading", true);
        throw new Error(error.message);
      }
    },
  },
};
export default userStore;
