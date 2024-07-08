<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { defineEmits, ref, defineProps } from "vue"

const emit = defineEmits(["closeModal "])

const props = defineProps({
  visible: { type: Boolean, required: true },
})

</script>

<template>
   
   <div class="modal" v-if="props.visible" @click.self="$emit('closeModal')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h4 class="modal-title">Create</h4>
        <span class="close" @click="$emit('closeModal')">&times;</span>
      </div>
      <div class="mx-3">
        <slot></slot>
      </div>
    </div>
  </div>

</template>



<style scoped>
/* Style the modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>