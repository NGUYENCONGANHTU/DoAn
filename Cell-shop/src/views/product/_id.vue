<template >
  <async-loading :isLoading="loading">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h6 class="modal-title">Update Product Detail</h6>
          <router-link to="/product" class="text-white">
            <font-awesome-icon :icon="['fas', 'arrow-rotate-left']" />
          </router-link>
        </div>
        <div class="mx-3">
          <product-detail :data="dataDetail" />
        </div>

        <div v-show="dataProductImage">
          <div class="modal-header bg-primary mx-3">
            <h6 class="modal-title">List Product IMG</h6>
            <router-link to="/product" class="text-white">
              <font-awesome-icon :icon="['fas', 'arrow-rotate-left']" />
            </router-link>
          </div>
          <product-ing-table-vue :data="dataProductImage" />
        </div>

        <div v-show="dataProductAttribute">
          <div class="modal-header bg-primary m-3">
            <h6 class="modal-title">List Product Attribute</h6>
            <router-link to="/product" class="text-white">
              <font-awesome-icon :icon="['fas', 'arrow-rotate-left']" />
            </router-link>
          </div>
          <product-attribute-table-vue :data="dataProductAttribute" />
        </div>

      </div>
    </div>
  </async-loading>
</template>
<script>
import {
  defineComponent,
  ref,
  onMounted,
  computed,
  watchEffect,
  reactive,
} from "vue";
import AsyncLoading from "@/components/AsyncLoading.vue";
import ProductDetailVue from "@/modules/product/ProductDetail.vue";
import ProductDetail from "@/modules/product/ProductDetail.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import ProductIngTableVue from "@/modules/productIMG/ProductIngTable.vue";
import ProductAttributeTableVue from "@/modules/ProductAttribute/ProductAttributeTable.vue";

export default defineComponent({
  components: {
    AsyncLoading,
    ProductDetail,
    ProductIngTableVue,
    ProductAttributeTableVue
  },
  setup() {
    const route = useRoute();
    // declare store
    const store = useStore();

    const dataDetail = computed(() =>
      store.getters["productRoot/getProductById"](Number(route.params.id))
    );

    const dataProductAttribute = computed(() =>
      store.getters["productDetail/dataProductAttribute"]
    );
    
    const dataProductImage = computed(
      () => store.getters["productDetail/dataProductImage"]
    );

    const loading = computed(() =>
      store.getters["productRoot/loadData"]
    );

    onMounted(async () => {
        const param = {
            product_id: Number(route.params.id),
        }
      await store.dispatch("productRoot/productDetail", Number(route.params.id));
      await store.dispatch("productDetail/getAllProductAttribute", { params: param });
      await store.dispatch("productDetail/getAllProductImage", { params: param });
    });

    return {
      dataDetail,
      dataProductImage,
      dataProductAttribute,
      loading
    };
  },
});
</script>
<style scoped>
</style>