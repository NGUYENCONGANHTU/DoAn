import { createStore } from 'vuex';
import { AuthService } from '@/service/auth.service';
import { UserLoginInfo } from '@/cheetah-core/mixins/user-login-info';
import Cookies from 'js-cookie';
import { Constants } from "@/constants/constants"
// declare class AuthService
const authService = new AuthService();

const loginStore = {
    //Allow modules to have namespace to avoid conflicts with other modules
    namespaced: true,

    state: {
        loading: false
    },

    mutations: {
        is_loading(state, loading) {
            state.loading = loading;
        }
    },

    getters: {
        //TODO: Computed properties
        isLoading: state => state.loading
    },

    actions: {

        async login({ commit },{params}) {
            try {
                commit('is_loading', true)
                const response = await authService.loginAdmin('/api/auth/login',params)
                if (response && response.token) {
                    // Set token cookie
                    Cookies.set(Constants.token, response.token);
                    // save user info localStorage
                    UserLoginInfo.methods.setUserLogin(response)
                    commit('is_loading', false);
                } else {
                    throw new Error('Invalid response or token missing');
                }
            } catch (error) {
                commit('is_loading', true)
                throw new Error(error.message)
            }
        },

        async logout ({ commit }) {
            try {
                commit('is_loading', true)
                await authService.logoutAdmin('/api/auth/logout')
                Cookies.remove(Constants.token);
                UserLoginInfo.methods.removeUserLogin(Constants.me)
                commit('is_loading', false)
            } catch (error) {
                commit('is_loading', true)
                throw new Error(error.message)
            }
        }
    }

}
export default loginStore;