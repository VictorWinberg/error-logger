import Vue, { VNode } from "vue";
import _ from "lodash/fp";
import "@mdi/font/css/materialdesignicons.css";

import { ApiService } from "./api";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/bueify";
import "./plugins/bootstrap";
import "./registerServiceWorker";

import "@/assets/scss/app.scss";

console.log(
  new ApiService("/api").getEntities({}).then(res => console.log(res.body))
);

Vue.config.productionTip = false;

Object.defineProperty(Vue.prototype, "$_", { value: _ });

export const bus = new Vue();

new Vue({
  router,
  store,
  render: (h): VNode => h(App)
}).$mount("#app");
