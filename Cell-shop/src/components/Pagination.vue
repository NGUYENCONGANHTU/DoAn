<!-- eslint-disable vue/multi-word-component-names -->
<script  setup lang="ts">
import { defineEmits, ref, defineProps } from "vue";

const pageChange = ref(1);
const emit = defineEmits(["pageChange"]);

const props = defineProps({
  count: { type: Number, required: true },
  limit: { type: Number, required: true },
});

const handlePageChange = (page: number) => {
  pageChange.value = page;
  emit("pageChange", page);
};

const onNext = () => {
  if (pageChange.value >= 1) {
    handlePageChange(pageChange.value + 1);
  }
};

const onPrevious = () => {
  if (pageChange.value < props.count) {
    handlePageChange(pageChange.value - 1);
  }
};
</script>

<template>
  <div class="card-footer">
    <ul class="pagination pagination-sm m-0 float-right">
        <li 
            @click="onPrevious()"
            :class="`${pageChange == 1 ? 'disabled' : ''} page-item`"
        >
            <a class="page-link" href="#">«</a>
        </li>
        <li :class="`page-item ${ page === pageChange ? 'active' : '' }`"
            v-for="page in Math.ceil(props.count / props.limit)"
            :key="page"
            @click="handlePageChange(page)"
        >
            <a class="page-link action" href="#">{{ page }}</a>
        </li>
        <li
            @click="onNext()"
            :class="`${ pageChange != 1 ? 'disabled' : ''} page-item`"
        >
            <a class="page-link" href="#">»</a>
        </li>
    </ul>
  </div>
</template>

<style>
</style>