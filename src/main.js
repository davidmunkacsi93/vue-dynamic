import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import ApiIntegrationService from "./services/api-integration-service";

Vue.config.productionTip = false;
Vue.prototype.$apiIntegrationService = ApiIntegrationService;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
