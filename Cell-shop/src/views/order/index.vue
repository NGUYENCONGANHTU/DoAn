<template>
  <div class="row mb-4">
    <div class="col-sm-6">
      <h1 class="m-0">Order</h1>
    </div>
    <div class="col-sm-6">
      <ol class="breadcrumb float-sm-right">
        <li class="breadcrumb-item"><a href="#">Home </a></li>
        <li class="breadcrumb-item active">Order</li>
      </ol>
    </div>
  </div>
  <order-search-form @searchForm="handelSearchFrom" @clearFrom="clearFrom" />
  <div class="card">
    <order-table :data="data" />
    <pagination
      :limit="LIMIT_PAGE"
      :count="countData"
      @pageChange="onPageChange"
    />
  </div>
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
import OrderTable from "@/modules/order/OrderTable.vue";
import OrderSearchForm from "@/modules/order/OrderSearchForm.vue";
import { useStore } from "vuex";
import Pagination from "@/components/Pagination.vue";
import { Constants } from "@/constants/constants";

export default defineComponent({
  components: {
    OrderTable,
    OrderSearchForm,
    Pagination,
  },
  setup() {
    // declare store
    const store = useStore();
    const data = computed(() => store.getters["order/dataOrder"]);
    const LIMIT_PAGE = ref(Constants.LIMIT);
    const currentPage = ref(1);
    const countData = ref(0);

    const query = reactive({
      name: "",
      limit: LIMIT_PAGE,
      page: currentPage,
    });

    const handelSearchFrom = (param) => {
      if (param) {
        query.name = param.name;
      }
    };

    const onPageChange = (page) => {
      currentPage.value = page;
    };

    //reset query
    const clearFrom = () => {
      query.name = "";
      query.limit = LIMIT_PAGE;
      query.page = currentPage;
    };

    watchEffect(async () => {
      if (query) {
        await store.dispatch("order/getAll", { params: query });
      }
    });

    onMounted(async () => {
      const param = {
        name: "",
      };
      await store.dispatch("order/getAll", { params: param });
      if (data.length > 0) {
        countData.value = data.length;
      }
    });

    return {
      data,
      handelSearchFrom,
      LIMIT_PAGE,
      onPageChange,
      clearFrom,
      countData,
    };
  },
});
</script>
<style lang=""></style>
