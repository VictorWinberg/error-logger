import Vue, { VNode } from "vue";
import "@mdi/font/css/materialdesignicons.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/bueify";
import "./plugins/bootstrap";
import "./registerServiceWorker";

Vue.config.productionTip = false;

export const bus = new Vue();

new Vue({
  router,
  store,
  render: (h): VNode => h(App)
}).$mount("#app");
