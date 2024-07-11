<template>
  <div class="row mb-4">
    <div class="col-sm-6">
      <h1 class="m-0">Category</h1>
    </div>
    <div class="col-sm-6">
      <ol class="breadcrumb float-sm-right">
        <li class="breadcrumb-item"><a href="#">Home </a></li>
        <li class="breadcrumb-item active">Category</li>
      </ol>
    </div>
  </div>
  <category-search-form @searchForm="handelSearchFrom" @clearFrom="clearFrom" />
  <div class="card">
    <category-table :data="data" />
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
import CategoryTable from "@/modules/category/CategoryTable.vue";
import CategorySearchForm from "@/modules/category/CategorySearchForm.vue";
import { useStore } from "vuex";
import Pagination from "@/components/Pagination.vue";
import { Constants } from "@/constants/constants";

export default defineComponent({
  components: {
    CategoryTable,
    CategorySearchForm,
    Pagination,
  },
  setup() {
    // declare store
    const store = useStore();
    const data = computed(() => store.getters["category/dataCategory"]);
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
        await store.dispatch("category/getAll", { params: query });
      }
    });

    onMounted(async () => {
      const param = {
        name: "",
      };
      await store.dispatch("category/getAll", { params: param });
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
