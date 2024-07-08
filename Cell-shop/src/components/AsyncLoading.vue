<template>
  <loading :active="isLoading" :can-cancel="false">
    <slot></slot>
  </loading>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useLoading } from 'vue-loading-overlay';
export default defineComponent ({
  props: {
    isLoading: {
      type: Boolean,
      required: true
    }
  },
  setup(props){
    const { show,hide } = useLoading();
    onMounted(() => {
      if(props.isLoading){
       setTimeout(() => {
         show({
          color: 'blue',
          width: 35,
          height: 35,
        })
       }, 1000)
      }else{
        hide
      }
    })
  }
  
});
</script>