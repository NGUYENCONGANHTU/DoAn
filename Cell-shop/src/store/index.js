import { createApp } from "vue";
import { createStore } from "vuex";
import loginStore from "./login.store";
import bannerStore from "./banner.store";
import productRootStore from "./product/root.store";
import productDetailRootStore from "./product/detail.store";
import categoryStore from "./category.store";
import trademarkStore from "./trademark.store";
import contactStore from "./contact.store";
import userStore from "./user.store";
import productReviewStore from "./product-review.store";
import orderDetailStore from "./order/order-detail.store";
import orderStore from "./order/order.store";

const store = createStore({
  modules: {
    auth: loginStore,
    banner: bannerStore,
    productRoot: productRootStore,
    productDetail: productDetailRootStore,
    category: categoryStore,
    trademark: trademarkStore,
    contact: contactStore,
    user: userStore,
    order: orderStore,
    orderDetail: orderDetailStore,
    productReview: productReviewStore,
  },
});

const app = createApp({});
app.use(store);

export default store;
