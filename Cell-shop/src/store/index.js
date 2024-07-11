import { createApp } from "vue";
import { createStore } from "vuex";
import loginStore from "./login.store";
import bannerStore from "./banner.store";
import productRootStore from "./product/root.store";
import productDetailRootStore from "./product/detail.store";
import categoryStore from "./category.store";
import trademarkStore from "./trademark.store";
import contactStore from "./contact.store";

const store = createStore({
  modules: {
    auth: loginStore,
    banner: bannerStore,
    productRoot: productRootStore,
    productDetail: productDetailRootStore,
    category: categoryStore,
    trademark: trademarkStore,
    contact: contactStore,
  },
});

const app = createApp({});
app.use(store);

export default store;
