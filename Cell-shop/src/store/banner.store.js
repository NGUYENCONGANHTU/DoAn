
import { BannerService } from "@/service/banner.service";
import { Constants } from "@/constants/constants"

// declare class AuthService
const bannerService = new BannerService();

const bannerStore = {
    //Allow modules to have namespace to avoid conflicts with other modules
    namespaced: true,

    state: {
        loading: false,
        // save cake data
        banner: []
    },

    mutations: {
        is_loading(state, loading) {
            state.loading = loading;
        },

        setCakeData(state, data) {
            state.banner = data
        },

        addCakeBanner(state, newData) {
            state.banner.push(newData)
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

    getters: {
        //TODO: Computed properties
        isLoading: state => state.loading,
        dataBanner: state => state.banner,
        getBannerById: (state) => (id) => {
            return state.banner.find(b => b.id === id)
        }
    },

    actions: {

        async getAll({ commit },{ params }) {
            try {
                commit('is_loading', true)
                const response = await bannerService.getBanners(`/api/admins/banner?${params}`)
                if (response) {
                    commit('setCakeData', [response])
                    commit('is_loading', false);
                }
            } catch (error) {
                commit('is_loading', true)
                throw new Error(error.message)
            }
        },

        async bannerDetail ({ commit },{ id } ) {
            try {
                commit('is_loading', true)
                const response = await bannerService.getBanner(`/api/admins/banner/show/${id}`)
                if (response) {
                    commit('setCakeData', [response])
                    commit('is_loading', false);
                }
            } catch (error) {
                commit('is_loading', true)
                throw new Error(error.message)
            }
        },

        async createBanner ({ commit },{ params } ) {
            try {
                commit('is_loading', true)
                const response = await bannerService.createBanner('/api/admins/banner/store/',params)
                if (response) {
                    commit('addCakeBanner', response)
                    commit('is_loading', false);
                }
            } catch (error) {
                commit('is_loading', true)
                throw new Error(error.message)
            }
        },

        async updateBanner ({commit},{ id, params }) {
            try {
                commit('is_loading', true)
                const response = await bannerService.updateBanner(`/api/admins/banner/update/${id}`,params)
                if (response) {
                    commit('updateCakeBanner', response)
                    commit('is_loading', false);
                }
            } catch (error) {
                commit('is_loading', true)
                throw new Error(error.message)
            }
        },

        async deleteBanner ({commit},{ id }) {
            try {
                commit('is_loading', true)
                const response = await bannerService.updateBanner(`/api/admins/banner/destroy/${id}`)
                if (response) {
                    commit('deleteCakeBanner', response)
                    commit('is_loading', false);
                }
            } catch (error) {
                commit('is_loading', true)
                throw new Error(error.message)
            }
        },
    }
}
export default bannerStore;