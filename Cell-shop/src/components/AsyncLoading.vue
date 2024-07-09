<template>
  <div v-if="isLoading" class="loading">
    <div class="spinner">
      <div class="spinner-border text-primary" role="status" />
    </div>
  </div>
  <div >
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    isLoading: {
      type: Boolean,
      required: false,
    },
  },
});
</script>
<style scoped>
.loading {
 position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(255 255 255 / 80%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.loading > .spinner {
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
  z-index: 999;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>