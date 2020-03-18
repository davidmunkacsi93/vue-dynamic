import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import ApiIntegrationService from "./services/api-integration-service";
import Axios from "axios";

Vue.config.productionTip = false;
Vue.prototype.$apiIntegrationService = ApiIntegrationService;
Vue.prototype.$http = Axios;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
