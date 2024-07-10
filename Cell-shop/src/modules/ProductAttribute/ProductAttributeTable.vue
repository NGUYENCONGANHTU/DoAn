<template>
  <async-loading :isLoading="false">
    <div class="card-header">
      <h3 class="card-title">List Attribute</h3>
      <div class="card-tools">
        <button type="button" @click="onShow" class="btn btn-primary">
          <font-awesome-icon :icon="['fas', 'plus']" />
        </button>
        <button type="button" @click="loadData" class="btn btn-info mx-2">
          <font-awesome-icon :icon="['fas', 'spinner']" />
        </button>
      </div>
    </div>

    <div class="card-body table-responsive p-0">
      <table class="table table-hover text-nowrap">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Type</th>
            <th>Attribute</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody v-for="attribute in data" :key="attribute.id">
          <tr>
            <td>
              {{ attribute.id }}
            </td>
            <td>
              {{ attribute.product.name }}
            </td>
            <td
              class="item-text"
              v-if=" attribute?.product_attribute.status == 1"
            >
              <div
                class="item-color"
                :style="{ background:  attribute?.product_attribute.value }"
              ></div>
            </td>
            <td class="item-text" v-else>{{  attribute?.product_attribute.value }}</td>
            <td>
              <span
                v-if="attribute.status == 1"
                class="badge rounded-pill bg-success"
                >Action</span
              >
              <span v-else class="badge rounded-pill bg-secondary"
                >InAction</span
              >
            </td>
            <td>{{ formatDate(attribute.created_at) }}</td>
            <td>
              <font-awesome-icon
                :icon="['far', 'eye']"
                class="text-warning pointer"
              />
              <font-awesome-icon
                :icon="['fas', 'link']"
                @click="goDetail(attribute.id)"
                class="text-primary mx-3 pointer"
              />
              <font-awesome-icon
                :icon="['fas', 'trash']"
                @click="confirmDelete(attribute)"
                class="text-danger pointer"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </async-loading>
  <!-- add attribute and edit attribute -->
</template>

<script>
import { defineComponent, ref, onMounted, computed, reactive } from "vue";
// import loading base app
import AsyncLoading from "@/components/AsyncLoading.vue";
// import BannerCreateEditForm from "./BannerCreateEditForm.vue";
import Modal from "@/components/Modal.vue";
import { URL_API } from "@/constants/env";
import { useStore } from "vuex";
import { onReload } from "@/helpers/reload.helpers";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    AsyncLoading,
    Modal,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    // declare store
    const store = useStore();
    const isOpen = ref(false);
    const dataDetail = ref({});
    const router = useRouter();

    const state = reactive({
      url: ref(URL_API),
    });

    const onClose = (value) => {
      isOpen.value = value;
    };

    const onShow = () => {
      isOpen.value = true;
      dataDetail.value = {};
    };

    const formatDate = (date) => {
      const convertDate = date.toString();
      return convertDate.substring(0, 10) + " " + convertDate.substring(11, 19);
    };

    // load page helpers base
    const loadData = () => {
      onReload();
    };

    const confirmDelete = async (data) => {
      console.log(data.name);
      if (
        window.confirm(`Are you sure you want to delete item ${data?.name} ?`)
      ) {
        if (data) {
          await store.dispatch("productDetail/deleteProductImage", data?.id);
        }
      }
    };

    const setDataDetail = (itemId) => {
      // show modal
      isOpen.value = true;
      dataDetail.value = computed(() =>
        store.getters["productDetail/getProductImageById"](itemId)
      ).value;
    };

    const goDetail = (id) => {
      router.push("product/update/" + id);
    };

    return {
      ...state,
      onClose,
      isOpen,
      onShow,
      formatDate,
      loadData,
      dataDetail,
      setDataDetail,
      confirmDelete,
      goDetail,
    };
  },
});
</script>
<style scoped>
.item-color{
  width: 20px;
  height: 20px;
}
</style>