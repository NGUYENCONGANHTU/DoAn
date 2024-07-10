<template>
    <div class="row mb-4">
        <div class="col-sm-6">
            <h1 class="m-0">Product</h1>
        </div>
        <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="#">Home </a></li>
                <li class="breadcrumb-item active">Product</li>
            </ol>
        </div>
    </div>
    <product-search-form 
        @searchForm="handelSearchFrom" 
        @clearFrom="clearFrom" 
    />
    <div class="card">
        <product-table 
            :data="data"
        />
        <pagination 
            :limit="LIMIT_PAGE" 
            :count="0" 
            @pageChange="onPageChange" 
        />
    </div>
</template>
<script>
import { defineComponent, ref, onMounted,computed,watchEffect ,reactive} from "vue";
import ProductTable from "@/modules/product/ProductTable.vue";
import ProductSearchForm from "@/modules/product/ProductSearchForm.vue";
import { useStore } from "vuex";
import Pagination from "@/components/Pagination.vue";
import { Constants } from "@/constants/constants"

export default defineComponent ({
    components: {
        ProductTable,
        ProductSearchForm,
        Pagination
    },
    setup(){
        // declare store
        const store = useStore();
        const data = computed(() => store.getters["productRoot/dataProduct"])
        const LIMIT_PAGE = ref(Constants.LIMIT);
        const currentPage = ref(1);

        const query = reactive({
            name: "",
            limit: LIMIT_PAGE,
            page: currentPage
        });

        const handelSearchFrom = (param) => {
            if(param){
                query.name = param.name
            }
        }

        const onPageChange = (page) => {
            currentPage.value = page;
        }

        //reset query
        const clearFrom = () => {
            query.name = ""
            query.limit = LIMIT_PAGE
            query.page = currentPage
        }
        
        watchEffect( async () => {
            if(query){
                await store.dispatch("productRoot/getAll", { params : query });
            }
        });

        onMounted(async () => {
            const param = {
                name: "",
            }
            await store.dispatch("productRoot/getAll", { params : param });
        });

        return {
            data,
            handelSearchFrom,
            LIMIT_PAGE,
            onPageChange,
            clearFrom
        };
    }
})
</script>
<style lang="">

</style>