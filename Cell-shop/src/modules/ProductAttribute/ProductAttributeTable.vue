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
            <th class="itemTH">ID</th>
            <th class="itemTH">Product</th>
            <th class="itemTH">Type</th>
            <th class="itemTH">Attribute</th>
            <th class="itemTH">Status</th>
            <th class="itemTH">Date</th>
          </tr>
        </thead>
        <tbody v-for="attribute in data" :key="attribute.id">
          <tr>
            <td class="itemTd">
              {{ attribute.id }}
            </td>
            <td class="itemTd">
              {{ attribute.product.name }}
            </td>
            <td
              class="itemTd"
              v-if=" attribute?.product_attribute.status == 1"
            >
              <div
                class="item-color"
                :style="{ background:  attribute?.product_attribute.value }"
              ></div>
            </td>
            <td class="itemTd" v-else>{{  attribute?.product_attribute.value }}</td>
            <td class="itemTd">
              <span
                v-if="attribute.status == 1"
                class="badge rounded-pill bg-success"
                >Action</span
              >
              <span v-else class="badge rounded-pill bg-secondary"
                >InAction</span
              >
            </td>
            <td class="itemTd">{{ formatDate(attribute.created_at) }}</td>
            <td class="itemTd">
              <font-awesome-icon
                :icon="['far', 'eye']"
                class="text-warning pointer"
              />
              <font-awesome-icon
                :icon="['fas', 'link']"
                @click="setDataDetail(attribute.id)"
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
  <modal :visible="isOpen" :id="checkIdEdit" @closeModal="onClose(false)">
    <product-attribute-create-edit-form-vue  :data="dataDetail" :onClose="onClose"  />
  </modal>
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
import ProductAttributeCreateEditFormVue from "./ProductAttributeCreateEditForm.vue";

export default defineComponent({
  components: {
    AsyncLoading,
    Modal,
    ProductAttributeCreateEditFormVue
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
    const checkIdEdit = ref(0);

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
      if (
        window.confirm(`Are you sure you want to delete item ${data?.product_attribute.name} - ${data?.product_attribute.value} ?`)
      ) {
        if (data) {
          await store.dispatch("productDetail/deleteProductAttribute", data?.id);
          router.push(`/product/update/${data?.id}`).then(() => {
            loadData()
          })
        }
      }
    };

    const setDataDetail = (itemId) => {
      // show modal
      isOpen.value = true;
      checkIdEdit.value = itemId;
      dataDetail.value = computed(() =>
        store.getters["productDetail/getProductAttributeById"](itemId)
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
      checkIdEdit
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