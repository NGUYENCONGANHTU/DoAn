import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { Field, Form, ErrorMessage, configure } from 'vee-validate';
import store from './store';
import Vue3Toasity from "vue3-toastify";
import { LoadingPlugin } from 'vue-loading-overlay';

// import adminlte
import 'admin-lte/dist/css/adminlte.min.css';
import 'admin-lte/dist/js/adminlte.min.js';

// import bootstrap vue 
import 'bootstrap/dist/js/bootstrap.min.js';
// import validate form
import "@/public/vue-validate";

// css vue3-toastify
import "vue3-toastify/dist/index.css";

// vue-loading-overlay
import 'vue-loading-overlay/dist/css/index.css';

//import fortawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import './static/fontawesome/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(fas,fab,far)

const app = createApp(App)
app.use(Vue3Toasity, {
    autoClose: 3000
});
app.use(router)
app.use(store)

app.use(LoadingPlugin, {
    color: '#FFA500'
});

app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')