<template>
  <async-loading :isLoading="false">
    <div class="card-header">
        <h3 class="card-title">List Product Images</h3>
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
              <th>Image</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody v-for="productImage in data" :key="productImage.id">
            <tr>
              <td>
                {{ productImage.id }}
              </td>
              <td>
                <img :src="url + '/' + productImage.file_name" width="70" alt="" />
              </td>
              <td>
                <span
                  v-if="productImage.status == 1"
                  class="badge rounded-pill bg-success"
                  >Action</span
                >
                <span v-else class="badge rounded-pill bg-secondary"
                  >InAction</span
                >
              </td>
              <td>{{ formatDate(productImage.created_at) }}</td>
              <td>
                <font-awesome-icon
                  :icon="['far', 'eye']"
                  class="text-warning pointer"
                />
                <font-awesome-icon
                  :icon="['fas', 'link']"
                  @click="goDetail(productImage.id)"
                  class="text-primary mx-3 pointer "
                />
                <font-awesome-icon
                  :icon="['fas', 'trash']"
                  @click="confirmDelete(productImage)"
                  class="text-danger pointer"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  </async-loading>
  <!-- add productImage and edit productImage -->
  <modal :visible="isOpen" :id="dataDetail.id" @closeModal="onClose(false)">
    <product-image-create-edit-form-vue :data="dataDetail" :onClose="onClose" />
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
import {useRouter} from 'vue-router';
import ProductImageCreateEditFormVue from "./ProductImageCreateEditForm.vue";

export default defineComponent({
  components: {
    AsyncLoading,
    ProductImageCreateEditFormVue,
    Modal,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  setup() {
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
      dataDetail.value = {}
    };

    const formatDate = (date) => {
      const convertDate = date.toString();
      return convertDate.substring(0, 10) + " " + convertDate.substring(11, 19);
    };

    // load page helpers base
    const loadData = () => {
      onReload();
    }

    const confirmDelete  = async (data) => {
      console.log(data.name);
      if (window.confirm(`Are you sure you want to delete item ${data?.name} ?`)) {
        if(data){
          await store.dispatch('productDetail/deleteProductImage', data?.id)
        }
      }
    }

    const setDataDetail = (itemId) => {
      // show modal
      isOpen.value = true
      dataDetail.value = computed(() => store.getters["productDetail/getProductImageById"](itemId)).value
    }

    const goDetail = (id) => {
      router.push('product/update/'+id)
    }
  
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
      goDetail
    };
  },
});
</script>