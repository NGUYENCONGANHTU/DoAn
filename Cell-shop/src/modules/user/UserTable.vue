<template>
  <async-loading :isLoading="loading">
    <div class="card-header">
      <h3 class="card-title">List User</h3>
      <div class="card-tools">
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
            <th>Tài khoản</th>
            <th>Tên</th>
            <th>Địa chỉ</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in data" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>
              <span v-if="user.status == 1" class="badge rounded-pill bg-success">Action</span>
              <span v-else class="badge rounded-pill bg-secondary">InAction</span>
            </td>
            <td>{{ formatDate(user.created_at) }}</td>
            <td>
              <font-awesome-icon :icon="['far', 'eye']" class="text-warning pointer" />
              <font-awesome-icon :icon="['fas', 'link']" @click="setDataDetail(user.id)"
                class="text-primary mx-3 pointer" />
              <font-awesome-icon :icon="['fas', 'trash']" @click="confirmDelete(user)" class="text-danger pointer" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </async-loading>

  <modal :visible="isOpen" :id="dataDetail.id" @closeModal="onClose(false)">
    <category-create-edit-form :data="dataDetail" :onClose="onClose" />
  </modal>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import AsyncLoading from "@/components/AsyncLoading.vue";
import Modal from "@/components/Modal.vue";
import { useStore } from "vuex";
import { onReload } from "@/helpers/reload.helpers";

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

    const loading = computed(() => store.getters["user/loadData"]);

    const formatDate = (date) => {
      const convertDate = date.toString();
      return convertDate.substring(0, 10) + " " + convertDate.substring(11, 19);
    };

    const loadData = () => {
      onReload();
    };

    const confirmDelete = async (user) => {
      if (window.confirm(`Are you sure you want to delete item ${user?.name}?`)) {
        if (user) {
          await store.dispatch("user/deleteUser", user?.id);
        }
      }
    };

    const setDataDetail = (userId) => {
      isOpen.value = true;
      dataDetail.value = computed(() => store.getters["user/getUserById"](userId)).value;
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
