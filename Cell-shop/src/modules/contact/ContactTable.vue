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
            <th class="itemTH">ID</th>
            <th class="itemTH">Tên Khách Hàng</th>
            <th class="itemTH">Số điện thoại</th>
            <th class="itemTH">Email</th>
            <th class="itemTH">Trạng Thái</th>
            <th class="itemTH">Ngày</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contact in data" :key="contact.id">
            <td class="itemTd">{{ contact.id }}</td>
            <td class="itemTd">{{ contact.name }}</td>
            <td class="itemTd">{{ contact.phone }}</td>
            <td class="itemTd">{{ contact.email }}</td>
            <td>
              <span
                v-if="contact.status == 1"
                class="badge rounded-pill bg-success"
                >Đang hoạt động</span
              >
              <span v-else class="badge rounded-pill bg-secondary"
                >Không hoạt động</span
              >
            </td>
            <td class="itemTd">{{ formatDate(contact.created_at) }}</td>
            <td class="itemTd">
              <font-awesome-icon
                :icon="['far', 'eye']"
                class="text-warning pointer"
              />
              <font-awesome-icon
                :icon="['fas', 'link']"
                @click="setDataDetail(contact.id)"
                class="text-primary mx-3 pointer"
              />
              <font-awesome-icon
                :icon="['fas', 'trash']"
                @click="confirmDelete(contact)"
                class="text-danger pointer"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </async-loading>
  <!-- thêm và chỉnh sửa liên hệ -->
  <modal
    :visible="isOpen"
    :id="dataDetail.id || null"
    @closeModal="onClose(false)"
  >
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
          router.push(`/contact`).then(() => {
            loadData();
          });
        }
      }
    };

    const setDataDetail = (itemId) => {
      isOpen.value = true;
      dataDetail.value = store.getters["contact/getContactById"](itemId) || {};
    };

    const formatDate = (date) => {
      const convertDate = date.toString();
      return convertDate.substring(0, 10) + " " + convertDate.substring(11, 19);
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
      formatDate,
    };
  },
});
</script>
