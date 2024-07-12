<template>
  <async-loading :isLoading="loading">
    <div class="card-header">
      <h3 class="card-title">List Order</h3>
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
            <th class="itemTH">Tên Khách Hàng</th>
            <th class="itemTH">Email</th>
            <th class="itemTH">Địa chỉ</th>
            <th class="itemTH">Số điện thoại</th>
            <th class="itemTH">Trạng thái</th>
          </tr>
        </thead>
        <tbody v-for="order in data" :key="order.id">
          <tr>
            <td class="itemTd">
              {{ order.id }}
            </td>
            <td class="itemTd">{{ order.name }}</td>
            <td class="itemTd">
              <span
                v-if="order.status == 1"
                class="badge rounded-pill bg-success"
                >Action</span
              >
              <span v-else class="badge rounded-pill bg-secondary"
                >InAction</span
              >
            </td>
            <td class="itemTd">{{ formatDate(order.created_at) }}</td>
            <td class="itemTd">
              <font-awesome-icon
                :icon="['far', 'eye']"
                class="text-warning pointer"
              />
              <font-awesome-icon
                :icon="['fas', 'link']"
                @click="setDataDetail(order.id)"
                class="text-primary mx-3 pointer"
              />
              <font-awesome-icon
                :icon="['fas', 'trash']"
                @click="confirmDelete(order)"
                class="text-danger pointer"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </async-loading>
  <!-- add category and edit category -->
  <modal :visible="isOpen" :id="dataDetail.id" @closeModal="onClose(false)">
    <order-create-edit-form :data="dataDetail" :onClose="onClose" />
  </modal>
</template>

<script>
import { defineComponent, ref, onMounted, computed, reactive } from "vue";
// import loading base app
import AsyncLoading from "@/components/AsyncLoading.vue";
import OrderCreateEditForm from "./OrderCreateEditForm.vue";
import Modal from "@/components/Modal.vue";
import { useStore } from "vuex";
import { onReload } from "@/helpers/reload.helpers";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    AsyncLoading,
    OrderCreateEditForm,
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

    const onClose = (value) => {
      isOpen.value = value;
    };

    const onShow = () => {
      isOpen.value = true;
      dataDetail.value = {};
    };

    const loading = computed(() => store.getters["category/loadData"]);

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
          await store.dispatch("category/deleteCategory", data?.id);
          router.push(`/category`).then(() => {
            loadData();
          });
        }
      }
    };

    const setDataDetail = (itemId) => {
      // show modal
      isOpen.value = true;
      dataDetail.value = computed(() =>
        store.getters["category/getCategoryById"](itemId)
      ).value;
    };

    return {
      onClose,
      isOpen,
      onShow,
      formatDate,
      loading,
      loadData,
      dataDetail,
      setDataDetail,
      confirmDelete,
    };
  },
});
</script>
