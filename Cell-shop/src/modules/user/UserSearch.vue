<template>
    <div>
        <div class="row m-0 p-0 mb-5">
            <div class="col-md-3 ">
                <label for="inputEmail4" class="form-label fw-bold">Name</label>
                <input type="text" v-model="params.name" class="form-control input-admin" id="inputEmail4"
                    placeholder="tìm kiếm theo name">
            </div>
            <div class="d-flex align-items-end">
                <button type="button" class="btn btn-primary input-admin  mx-1" @click="handelSearchFrom">
                    <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                    Search
                </button>
                <button type="button" class="btn btn-danger input-admin" @click="handelClearFrom">
                    <font-awesome-icon :icon="['fas', 'eraser']" />
                    Clear
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineComponent, ref, onMounted, defineEmits } from "vue";
const emit = defineEmits(['searchForm'])

const params = ref({
    name: ""
})

const handelSearchFrom = () => {
    emit('searchForm', params.value)
}

const handelClearFrom = () => {
    emit('clearFrom')
    params.value.name = ""
}

</script>
<style lang="">

</style>