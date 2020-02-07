import Vue from "vue";
import Vuex from "vuex";
import mainLayout from "./modules/main-layout";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    mainLayout: mainLayout
  }
});
