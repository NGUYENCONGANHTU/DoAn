<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="wrapper">
      <main-header-vue />
      <main-sidebar-vue />
      <div class="content-wrapper">
           <div class="content-header">
              <div class="container-fluid">
                  <router-view> </router-view>
              </div>
          </div>
      </div>
      <main-footer />
    </div>
  </template>
  
  <script lang="ts">
  import MainFooter from "@/components/MainFooter.vue";
  import MainHeaderVue from "@/components/MainHeader.vue";
  import MainSidebarVue from "@/components/MainSidebar.vue";
  import { defineComponent} from "vue";
  
  export default defineComponent (
  {
      components: {
          MainHeaderVue,
          MainSidebarVue,
          MainFooter,
      },
  }) 
  
  </script>
  <style>
  </style>