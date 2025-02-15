import { ContactsService } from "@/service/contacts_service";

// declare class AuthService
const contactService = new ContactsService();

const contactStore = {
  //Allow modules to have namespace to avoid conflicts with other modules
  namespaced: true,

  state: {
    loadingApp: false,
    // save cake data
    contact: [],
  },

  mutations: {
    isLoading(state, loading) {
      state.loadingApp = loading;
    },

    setCakeData(state, data) {
      state.contact = data;
    },

    addCakeContact(state, newData) {
      state.contact = [...state.contact, newData];
    },

    updateCakeContact(state, update) {
      const index = state.contact.findIndex((item) => item.id === update.id);
      if (index !== -1) {
        state.contact[index] = update;
      }
    },

    deleteCakeContact(state, id) {
      state.contact = state.contact.filter((item) => item.id !== id);
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
        const response = await contactService.getContact(
          `/api/admins/contacts?${queryString}`
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

    async contactDetail({ commit }, { id }) {
      try {
        commit("isLoading", true);
        const response = await contactService.getContact(
          `/api/admins/contact/show/${id}`
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

    async createContact({ commit }, params) {
      try {
        commit("isLoading", true);
        console.log(params);
        const response = await contactService.createContact(
          `/api/admins/contact/store`,
          params
        );
        console.log(response);
        if (response) {
          commit("addCakeContact", response);
          commit("isLoading", false);
        }
      } catch (error) {
        commit("isLoading", true);
        throw new Error(error.message);
      }
    },

    async updateContact({ commit }, params) {
      try {
        commit("isLoading", true);
        const response = await contactService.updateContact(
          `/api/admins/contact/update/${params.id}`,
          params
        );
        if (response) {
          commit("updateCakeContact", response);
          commit("isLoading", false);
        }
      } catch (error) {
        commit("isLoading", true);
        throw new Error(error.message);
      }
    },

    async deleteContact({ commit }, id) {
      try {
        commit("isLoading", true);
        const response = await contactService.deleteContact(
          `/api/admins/contact/destroy/${id}`
        );
        if (response) {
          commit("deleteCakeContact", id);
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
    dataContact: (state) => state.contact,
    getContactById: (state) => (id) => {
      return state.contact.find((b) => b.id === id);
    },
  },
};
export default contactStore;
