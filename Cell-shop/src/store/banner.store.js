
import { BannerService } from "@/service/banner.service";

// declare class AuthService
const bannerService = new BannerService();

const bannerStore = {
    //Allow modules to have namespace to avoid conflicts with other modules
    namespaced: true,

    state: {
        loadingApp: false,
        // save cake data
        banner: []
    },

    mutations: {
        isLoading(state, loading) {
            state.loadingApp = loading;
        },

        setCakeData(state, data) {
            state.banner = data
        },

        addCakeBanner(state, newData) {
            state.banner = [...state.banner, newData ]
        },

        updateCakeBanner(state, update) {
            const index = state.banner.findIndex(item => item.id === update.id);
            if(index !== -1){
                state.banner[index] = update
            }
        },

        deleteCakeBanner(state, id) {
            state.banner = state.banner.filter(item => item.id !== id);
        }
    },

    actions: {

        async getAll({ commit }, { params }) {
            try {
                commit('isLoading', true)
                const response = await bannerService.getBanners(`/api/admins/banner?${params}`)
                if (response) {
                    commit('setCakeData', response)
                    // commit('setBannerText', response)
                    setTimeout(() => {
                        commit('isLoading', false);
                    },1000)
                }
            } catch (error) {
                commit('isLoading', true)
                throw new Error(error.message)
            }
        },

        async bannerDetail ({ commit },{ id } ) {
            try {
                commit('isLoading', true)
                const response = await bannerService.getBanner(`/api/admins/banner/show/${id}`)
                if (response) {
                    commit('setCakeData', [response])
                    commit('isLoading', false);
                }
            } catch (error) {
                commit('isLoading', true)
                throw new Error(error.message)
            }
        },

        async createBanner ({ commit }, params ) {
            try {
                commit('isLoading', true)
                const response = await bannerService.createBanner('/api/admins/banner/store/',params)
                if (response) {
                    commit('addCakeBanner', response)
                    commit('isLoading', false);
                }
            } catch (error) {
                commit('isLoading', true)
                throw new Error(error.message)
            }
        },

        async updateBanner ({commit}, params) {
            try {
                commit('isLoading', true)
                const response = await bannerService.updateBanner(`/api/admins/banner/update`,params)
                if (response) {
                    commit('updateCakeBanner', response)
                    commit('isLoading', false);
                }
            } catch (error) {
                commit('isLoading', true)
                throw new Error(error.message)
            }
        },

        async deleteBanner ({commit}, id ) {
            try {
                commit('isLoading', true)
                const response = await bannerService.deleteBanner(`/api/admins/banner/destroy/${id}`)
                if (response) {
                    commit('deleteCakeBanner', response)
                    commit('isLoading', false);
                }
            } catch (error) {
                commit('isLoading', true)
                throw new Error(error.message)
            }
        }
    },

    getters: {
        //TODO: Computed properties
        loadData: (state) => state.loadingApp,
        dataBanner: (state) => state.banner,
        getBannerById: (state) => (id) => {
            return state.banner.find(b => b.id === id)
        }
    }
}
export default bannerStore;