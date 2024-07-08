import { createApp } from 'vue';
import { createStore } from 'vuex';
import loginStore from './login.store';
import bannerStore from './banner.store';

const store = createStore({
  modules: {
    auth: loginStore,
    banner: bannerStore
  }
});

const app = createApp({});
app.use(store);

export default store;