<template>
  <async-loading :isLoading="loading">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">List Banner</h3>
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
              <th>Link</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody v-for="banner in data" :key="banner.id">
            <tr>
              <td>
                {{ banner.id }}
              </td>
              <td>{{ banner.name }}</td>
              <td>
                <img :src="url + '/' + banner.images" width="70" alt="" />
              </td>
              <td>
                <a
                  :href="banner.link"
                  target="_blank"
                  class="tag text-primary"
                  >{{ banner.link }}</a
                >
              </td>
              <td>
                <span
                  v-if="banner.status == 1"
                  class="badge rounded-pill bg-success"
                  >Action</span
                >
                <span v-else class="badge rounded-pill bg-secondary"
                  >InAction</span
                >
              </td>
              <td>{{ formatDate(banner.created_at) }}</td>
              <td>
                <font-awesome-icon
                  :icon="['far', 'eye']"
                  class="text-warning pointer"
                />
                <font-awesome-icon
                  :icon="['fas', 'link']"
                  @click="setDataDetail(banner.id)"
                  class="text-primary mx-3 pointer "
                />
                <font-awesome-icon
                  :icon="['fas', 'trash']"
                  @click="confirmDelete(banner)"
                  class="text-danger pointer"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </async-loading>
  <!-- add banner and edit banner -->
  <modal :visible="isOpen" :id="dataDetail.id" @closeModal="onClose(false)">
    <banner-create-edit-form :data="dataDetail" :onClose="onClose" />
  </modal>

</template>

<script>
import { defineComponent, ref, onMounted, computed, reactive } from "vue";
// import loading base app
import AsyncLoading from "@/components/AsyncLoading.vue";
import BannerCreateEditForm from "./BannerCreateEditForm.vue";
import Modal from "@/components/Modal.vue";
import { URL_API } from "@/constants/env";
import { useStore } from "vuex";
import { onReload } from "@/helpers/reload.helpers";

export default defineComponent({
  components: {
    AsyncLoading,
    BannerCreateEditForm,
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

    const loading = computed(() => store.getters["banner/loadData"])

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
          await store.dispatch('banner/deleteBanner', data?.id)
        }
      }
    }

    const setDataDetail = (itemId) => {
      // show modal
      isOpen.value = true
      dataDetail.value = computed(() => store.getters["banner/getBannerById"](itemId)).value
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
      confirmDelete
    };
  },
});
</script>