import Vue, { VNode } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
// import "./plugins/element";
import "./plugins/bueify";
import "./registerServiceWorker";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

export const bus = new Vue();

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

new Vue({
  router,
  store,
  render: (h): VNode => h(App)
}).$mount("#app");
