<template>
  <div>
    <async-loading :isLoading="loading">
      <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <!-- Left navbar links -->
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" data-widget="pushmenu" href="#" role="button"
              ><i class="fas fa-bars"></i
            ></a>
          </li>
          <li class="nav-item d-none d-sm-inline-block">
            <a href="index3.html" class="nav-link">Home</a>
          </li>
          <li class="nav-item d-none d-sm-inline-block">
            <a href="/contact" class="nav-link">Contact</a>
          </li>
        </ul>

        <!-- Right navbar links -->
        <ul class="navbar-nav ml-auto">
          <!-- Navbar Search -->
          <li class="nav-item">
            <a
              class="nav-link"
              data-widget="navbar-search"
              href="#"
              role="button"
            >
              <i class="fas fa-search"></i>
            </a>
          </li>

          <!-- Messages Dropdown Menu -->
          <li class="nav-item dropdown">
            <a class="nav-link" data-toggle="dropdown" href="#">
              <i class="far fa-comments"></i>
              <span class="badge badge-danger navbar-badge">3</span>
            </a>
          </li>
          <!-- Notifications Dropdown Menu -->
          <li class="nav-item dropdown">
            <a class="nav-link" data-toggle="dropdown" href="#">
              <i class="far fa-bell"></i>
              <span class="badge badge-warning navbar-badge">15</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-widget="fullscreen" href="#" role="button">
              <i class="fas fa-expand-arrows-alt"></i>
            </a>
          </li>
          <li class="nav-item">
            <a
              :class="`nav-link dropdown-toggle ${
                checkAdmin ? 'text-primary' : ''
              }`"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ userInfo?.email }}
            </a>
            <ul class="dropdown-menu" style="right: 5px; left: auto">
              <li>
                <a class="dropdown-item text-primary text_profile" href="#">
                  <font-awesome-icon
                    :icon="['far', 'id-badge']"
                    class="text-primary"
                  />
                  profile
                </a>
              </li>
              <li>
                <a class="dropdown-item text-success text_profile" href="#">
                  <font-awesome-icon :icon="['fas', 'key']" />
                  changePassword
                </a>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a
                  class="dropdown-item text-danger text_profile"
                  @click="handelLogout"
                  href="#"
                >
                  <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
                  logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </async-loading>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Constants } from "@/constants/constants";
import { toast } from "vue3-toastify";
import { UserLoginInfo } from "@/cheetah-core/mixins/user-login-info";
// import loading base app
import AsyncLoading from "./AsyncLoading.vue";

export default defineComponent({
  components: {
    AsyncLoading,
  },
  setup() {
    // declare store
    const store = useStore();
    const router = useRouter();
    const userInfo = ref(null);
    const checkAdmin = ref(false);

    const handelLogout = async () => {
      try {
        await store.dispatch("auth/logout");
        router.push("/login").then(() => {
          toast.success(`status: ${Constants.OK200}: logout successfully`);
        });
      } catch (error) {
        toast.error(`status: ${Constants.Error}: logout failed!!!`);
      }
    };

    const showUserInfo = () => {
      const me = UserLoginInfo.methods.getUserLogin(Constants.me);
      if (!me) {
        userInfo.value = "";
      }
      if (me?.roles[0].name === "super-admin") {
        checkAdmin.value = true;
      } else {
        checkAdmin.value = false;
      }
      userInfo.value = me;
    };

    // Getter computed property to get loading state
    const loading = computed(() => store.getters["auth/isLoading"]);

    onMounted(() => {
      showUserInfo();
    });

    return {
      handelLogout,
      userInfo,
      checkAdmin,
      loading,
    };
  },
});
</script>
<style scope>
.text_profile {
  font-size: 14px;
}
.cus_dropdown_menu {
  position: absolute;
  top: 100%;
  right: 5px;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
}
</style>
