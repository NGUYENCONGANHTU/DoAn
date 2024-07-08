<template>
    <async-loading :isLoading="false">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">List Banner</h3>
                <div class="card-tools">
                    <button type="button" @click="onShow" class="btn btn-primary">
                        <font-awesome-icon :icon="['fas', 'plus']" />
                    </button>
                    <button type="button" class="btn btn-info mx-2">
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
                    <tbody v-for=" banner in data[0]" :key="banner.id">
                        <tr>
                            <td> {{  banner.id  }} </td>
                            <td> {{ banner.name }}</td>
                            <td>
                                <img :src="url + '/' + banner.images" width="70" alt="" />
                            </td>
                            <td><span class="tag tag-success">{{ banner.link }}</span></td>
                            <td>
                                <span v-if="banner.status == 1" class="badge rounded-pill bg-success">Action</span>
                                <span v-else class="badge rounded-pill bg-secondary">InAction</span>
                            </td>
                            <td></td>
                            <td>
                                <font-awesome-icon :icon="['far', 'eye']"
                                    class="text-warning item-cursor" />
                                <font-awesome-icon :icon="['fas', 'link']"
                                    class="text-primary mx-3 item-cursor" />
                                <font-awesome-icon :icon="['fas', 'trash']"
                                    class="text-danger item-cursor" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </async-loading>
    <modal :visible="isOpen" @closeModal="onClose">
        <banner-create-edit-form  />
    </modal>
</template>

<script>
import { defineComponent, ref, onMounted,computed } from "vue";
// import loading base app
import AsyncLoading from "@/components/AsyncLoading.vue";
import BannerCreateEditForm from "./BannerCreateEditForm.vue";
import Modal from "@/components/Modal.vue";
import { URL_API } from "@/constants/env";
import { useStore } from 'vuex';

export default defineComponent({
    components: {
        AsyncLoading,
        BannerCreateEditForm,
        Modal
    },
    
    setup() {

        // declare store
        const store = useStore();
        const isOpen = ref(false);
        const url = ref(URL_API);

       const onClose = () => {
            isOpen.value = false
       }

       const onShow = () => {
            isOpen.value = true
       }

    //    const formatDate = (date) => {
    //         //return date.substring(0, 10) + " " + date.substring(11, 19)
    //     }

       onMounted( async () => {
            await store.dispatch('banner/getAll', { params:'' })
            console.log(data);
       })
       const data = computed(() => store.getters['banner/dataBanner']);
       
       return {
            onClose,
            isOpen,
            onShow,
            data,
            url
       }
    }
});
</script>