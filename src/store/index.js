import Vue from "vue";
import Vuex from "vuex";

import apiLayouts from "./modules/api-layouts";
import mainLayout from "./modules/main-layout";
import responsive from "./modules/responsive";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    apiLayouts: apiLayouts,
    mainLayout: mainLayout,
    responsive: responsive
  }
});
