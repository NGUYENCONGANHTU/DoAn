<template>
  <async-loading :isLoading="loading">
    <div class="card-header">
      <h3 class="card-title">Danh Sách Liên Hệ</h3>
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
            <th>Tên Khách Hàng</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Trạng Thái</th>
            <th>Ngày</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contact in data" :key="contact.id">
            <td>{{ contact.id }}</td>
            <td>{{ contact.name }}</td>
            <td>{{ contact.phone }}</td>
            <td>{{ contact.email }}</td>
            <td>
              <span v-if="contact.status == 1" class="badge rounded-pill bg-success">Đang hoạt động</span>
              <span v-else class="badge rounded-pill bg-secondary">Không hoạt động</span>
              <font-awesome-icon :icon="['far', 'eye']" class="text-warning pointer" />
              <font-awesome-icon :icon="['fas', 'link']" @click="setDataDetail(contact.id)"
                class="text-primary mx-3 pointer" />
              <font-awesome-icon :icon="['fas', 'trash']" @click="confirmDelete(contact)" class="text-danger pointer" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </async-loading>
  <!-- thêm và chỉnh sửa liên hệ -->
  <modal :visible="isOpen" :id="dataDetail.id || null" @closeModal="onClose(false)">
    <contacts-create-edit-form :data="dataDetail" :onClose="onClose" />
  </modal>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import AsyncLoading from "@/components/AsyncLoading.vue";
import ContactsCreateEditForm from "./ContactsCreateEditForm.vue";
import Modal from "@/components/Modal.vue";
import { useStore } from "vuex";
import { onReload } from "@/helpers/reload.helpers";

export default defineComponent({
  components: {
    AsyncLoading,
    ContactsCreateEditForm,
    Modal,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const isOpen = ref(false);
    const dataDetail = ref({});

    const onClose = (value) => {
      isOpen.value = value;
    };

    const onShow = () => {
      isOpen.value = true;
      dataDetail.value = {};
    };

    const loading = computed(() => store.getters["contact/loadData"]);

    const loadData = () => {
      onReload();
    };

    const confirmDelete = async (data) => {
      if (
        window.confirm(`Bạn có chắc chắn muốn xóa mục ${data?.name} không?`)
      ) {
        if (data) {
          await store.dispatch("contact/deleteContact", data?.id);
        }
      }
    };

    const setDataDetail = (itemId) => {
      isOpen.value = true;
      dataDetail.value = store.getters["contact/getContactById"](itemId) || {};
    };

    return {
      onClose,
      isOpen,
      onShow,
      loading,
      loadData,
      dataDetail,
      setDataDetail,
      confirmDelete,
    };
  },
});
</script>
