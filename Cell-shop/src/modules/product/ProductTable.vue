<template>
  <async-loading :isLoading="loading">
    <div class="card-header">
      <h3 class="card-title">List Product</h3>
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
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Category</th>
            <th>Trademark</th>
            <th>View</th>
            <th>Purchases</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody v-for="product in data" :key="product.id">
          <tr>
            <td>
              {{ product.id }}
            </td>
            <td>{{ product.name }}</td>
            <td>
              <img :src="url + '/' + product.images" width="70" alt="" />
            </td>
            <td class="item-text">
              <span
                :class="`${
                  product.sale_price > 0 ? 'text-decoration-line-through' : ''
                }`"
              >
                {{
                  product.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })
                }} </span
              ><br />
              {{
                product.sale_price > 0
                  ? product.sale_price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  : ""
              }}
            </td>
            <td>{{ product.category[0].name }}</td>
            <td>{{ product.trademark[0].name }}</td>
            <td>{{ product.is_view }}</td>
            <td>{{ product.is_purchases }}</td>
            <td>
              <span
                v-if="product.status == 1"
                class="badge rounded-pill bg-success"
                >Action</span
              >
              <span v-else class="badge rounded-pill bg-secondary"
                >InAction</span
              >
            </td>
            <td>{{ formatDate(product.created_at) }}</td>
            <td>
              <font-awesome-icon
                :icon="['far', 'eye']"
                class="text-warning pointer"
              />
              <font-awesome-icon
                :icon="['fas', 'link']"
                @click="goDetail(product.id)"
                class="text-primary mx-3 pointer"
              />
              <font-awesome-icon
                :icon="['fas', 'trash']"
                @click="confirmDelete(product)"
                class="text-danger pointer"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </async-loading>
  <!-- add product and edit product -->
  <modal :visible="isOpen" :id="dataDetail.id" @closeModal="onClose(false)">
    <product-create-edit-form :data="dataDetail" :onClose="onClose" />
  </modal>
</template>

<script>
import { defineComponent, ref, onMounted, computed, reactive } from "vue";
// import loading base app
import AsyncLoading from "@/components/AsyncLoading.vue";
import ProductCreateEditForm from "./ProductCreateEditForm.vue";
import Modal from "@/components/Modal.vue";
import { URL_API } from "@/constants/env";
import { useStore } from "vuex";
import { onReload } from "@/helpers/reload.helpers";
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    AsyncLoading,
    ProductCreateEditForm,
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
      dataDetail.value = {};
    };

    const loading = computed(() => store.getters["productRoot/loadData"]);

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
          await store.dispatch("productRoot/deleteProduct", data?.id);
        }
      }
    };

    const setDataDetail = (itemId) => {
      // show modal
      isOpen.value = true;
      dataDetail.value = computed(() =>
        store.getters["productRoot/getProductById"](itemId)
      ).value;
    };

    const goDetail = (id) => {
      router.push('product/update/'+id)
    }

    return {
      ...state,
      onClose,
      isOpen,
      onShow,
      formatDate,
      loading,
      loadData,
      dataDetail,
      setDataDetail,
      confirmDelete,
      goDetail
    };
  },
});
</script>
<style scoped>
.text-decoration-line-through {
  text-decoration: line-through;
}
</style>