import Vue from "vue";
import VueToast from "vue-toast-notification";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vue-toast-notification/dist/theme-bootstrap.css";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueToast);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
