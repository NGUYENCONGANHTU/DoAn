<template>
    <div class="row mb-4">
        <div class="col-sm-6">
            <h1 class="m-0">Banner</h1>
        </div>
        <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="#">Home </a></li>
                <li class="breadcrumb-item active">Banner</li>
            </ol>
        </div>
    </div>
    <banner-search-form />
    <banner-table :data="data"/>
</template>
<script>
import { defineComponent, ref, onMounted,computed } from "vue";
import BannerTable from "@/modules/banner/BannerTable.vue";
import BannerSearchForm from "@/modules/banner/BannerSearchForm.vue";
import { useStore } from "vuex";

export default defineComponent ({
    components: {
        BannerTable,
        BannerSearchForm
    },
    setup(){
        // declare store
        const store = useStore();
        const data = computed(() => store.getters["banner/dataBanner"])

        onMounted(async () => {
            await store.dispatch("banner/getAll", { params: "" });
        });

        return {
            data
        };
    }
})
</script>
<style lang="">

</style>