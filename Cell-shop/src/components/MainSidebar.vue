<template>
  <div>
    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <!-- Brand Logo -->
      <a href="#" class="brand-link">
        <img
          src="@/assets/images/AdminLTELogo.png"
          alt="AdminLTE Logo"
          class="brand-image img-circle elevation-3"
          style="opacity: 0.8"
        />
        <span class="brand-text font-weight-light">Admin sell phone</span>
      </a>

      <!-- Sidebar -->
      <div class="sidebar">
        <!-- Sidebar user panel (optional) -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image">
            <!-- <img
                src=""
                class="img-circle elevation-2"
                alt="User Image"
              /> -->
          </div>
          <div class="info">
            <a href="#" class="d-block">
              {{ userInfo ? userInfo.name : "" }}: Role:
              {{ userInfo?.roles[0].name }}
            </a>
          </div>
        </div>

        <!-- Sidebar Menu -->
        <nav class="mt-2">
          <ul
            class="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
          >
            <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
            <!-- <li class="nav-item menu-open">
                <a href="/" class="nav-link active">
                  <i class="nav-icon fas fa-tachometer-alt"></i>
                  <p>
                    Dashboard
                    
                  </p>
                </a>
              </li> -->

            <!-- menu product -->
            <!-- <li class="nav-item menu-open ">
                <router-link to="/product" class="nav-link ">
                 <font-awesome-icon :icon="['fas', 'box-archive']" />
                  <p class="mx-1">
                    Product 
                  </p>
                </router-link>
                <ul class="nav nav-treeview">
                  <li v-for="(item,index) in PRODUCT_MENU" @click="setMenuProductActive(index)" :key="index" class="nav-item ">
                    <router-link :to="item.path" :class="`nav-link ${productMenu === index ? 'active' : '' }`">
                       <font-awesome-icon :icon="['fas', `${item.icon}`]" />
                      <p class="mx-2">{{item.name}}</p>
                    </router-link>
                  </li>
                </ul>
              </li> -->

            <!-- for menu  -->
            <li
              v-for="(item, index) in MENU_DEFAULT_APP"
              :key="index"
              @click="toggleClass(index)"
              class="nav-item menu-open"
            >
              <router-link
                :to="item.path"
                :class="`nav-link ${isActive === index ? 'active' : ''}`"
              >
                <font-awesome-icon :icon="['fas', `${item.icon}`]" />
                <p class="mx-2">{{ item.name }}</p>
              </router-link>
            </li>
          </ul>
        </nav>
        <!-- /.sidebar-menu -->
      </div>
      <!-- /.sidebar -->
    </aside>
  </div>
</template>
<script>
import { MENU_DEFAULT_APP } from "@/constants/menu";
import { defineComponent, onMounted, ref } from "vue";
import { UserLoginInfo } from "@/cheetah-core/mixins/user-login-info";
import { Constants } from "@/constants/constants";
export default defineComponent({
  setup() {
    const isActive = ref(0);
    const userInfo = ref(null);

    const toggleClass = (value) => {
      isActive.value = value;
    };

    const showUserInfo = () => {
      const me = UserLoginInfo.methods.getUserLogin(Constants.me);
      if (!me) {
        userInfo.value = "";
      }
      userInfo.value = me;
    };

    onMounted(() => {
      showUserInfo();
    });

    return {
      isActive,
      toggleClass,
      MENU_DEFAULT_APP,
      userInfo,
    };
  },
});
</script>
