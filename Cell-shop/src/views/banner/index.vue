<template>
    <div class="row mb-4">
        <div class="col-sm-6">
            <h1 class="m-0">Banner</h1>
        </div>
        <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item active">Banner</li>
            </ol>
        </div>
    </div>
    <banner-search-form />
    <banner-table/>
</template>
<script>
import { defineComponent, ref, onMounted } from "vue";
import BannerTable from "@/modules/banner/BannerTable.vue";
import BannerSearchForm from "@/modules/banner/BannerSearchForm.vue";

export default defineComponent ({
    components: {
        BannerTable,
        BannerSearchForm
    }
})
</script>
<style lang="">

</style>